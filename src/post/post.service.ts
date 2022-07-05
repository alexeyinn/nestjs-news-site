import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { SearchPostDto } from "./dto/search-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostEntity } from "./entities/post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  create(dto: CreatePostDto) {
    return this.postRepository.save(dto);
  }

  findAll() {
    return this.postRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  async popular() {
    // return await this.postRepository.find({
    //   order: {
    //     views: "DESC",
    //   },
    // });

    const qb = this.postRepository.createQueryBuilder("p");

    qb.orderBy("views", "DESC");
    qb.limit(10);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async search(dto: SearchPostDto) {
    const qb = this.postRepository.createQueryBuilder("p");

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.views) {
      qb.orderBy("views", dto.views);
    }

    if (dto.body) {
      qb.andWhere(`p.body ILIKE :body`);
    }

    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title`);
    }

    if (dto.tags) {
      qb.andWhere(`p.tags ILIKE :tags`);
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tags: `%${dto.tags}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
