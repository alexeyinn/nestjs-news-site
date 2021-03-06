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
  Query,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { SearchPostDto } from "./dto/search-post.dto";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get("popular")
  sortByPopular() {
    return this.postService.popular();
  }

  @Get("search")
  search(@Query() dto: SearchPostDto) {
    return this.postService.search(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const post = await this.postService.findOne(+id);

    if (!post) {
      throw new HttpException("Статья не найдена!", HttpStatus.NOT_FOUND);
    }

    return post;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    const editedPost = await this.postService.update(+id, updatePostDto);

    if (editedPost.affected === 0) {
      throw new HttpException("Статья не найдена!", HttpStatus.NOT_FOUND);
    }

    return editedPost;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const deletedPost = await this.postService.remove(+id);

    if (deletedPost.affected === 0) {
      throw new HttpException("Статья не найдена!", HttpStatus.NOT_FOUND);
    }

    return deletedPost;
  }
}
