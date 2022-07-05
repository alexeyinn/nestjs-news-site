import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const post = await this.commentService.findOne(+id);

    if (!post) {
      throw new HttpException("Комментарий не найден!", HttpStatus.NOT_FOUND);
    }

    return post;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const editedComment = await this.commentService.update(
      +id,
      updateCommentDto
    );

    if (editedComment.affected === 0) {
      throw new HttpException("Комментарий не найден!", HttpStatus.NOT_FOUND);
    }

    return editedComment;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const deletedComment = await this.commentService.remove(+id);

    if (deletedComment.affected === 0) {
      throw new HttpException("Комментарий не найден!", HttpStatus.NOT_FOUND);
    }

    return deletedComment;
  }
}
