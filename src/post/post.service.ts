import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
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
    return this.postRepository.find();
  }

  popular() {
    return this.postRepository.find({
      order: {
        views: "DESC",
      },
    });
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
