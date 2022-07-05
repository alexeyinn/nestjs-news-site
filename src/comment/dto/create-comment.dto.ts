import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;
}
