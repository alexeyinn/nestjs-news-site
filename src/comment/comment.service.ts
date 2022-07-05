import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentEntity } from "./entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) {}

  create(dto: CreateCommentDto) {
    return this.commentRepository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: dto.userId },
    });
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateCommentDto) {
    return this.commentRepository.update(id, dto);
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
