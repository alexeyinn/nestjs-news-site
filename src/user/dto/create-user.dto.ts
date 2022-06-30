import { IsEmail, IS_RFC_3339, Length } from "class-validator";

export class CreateUserDto {
  @Length(3, 32, {
    message: "Имя пользователя должно быть от 3 до 32 символов!",
  })
  fullName: string;

  @IsEmail(undefined, {
    message: "Проверьте указанный адрес почты! Неверный формат!",
  })
  email: string;

  @Length(6, 12, { message: "Пароль должен содержать от 3 до 32 символов!" })
  password?: string;
}
