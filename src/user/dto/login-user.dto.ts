import { IsEmail, Length } from "class-validator";

export class LoginUserDto {
  @IsEmail(undefined, {
    message: "Проверьте указанный адрес почты! Неверный формат!",
  })
  email: string;

  @Length(6, 12, { message: "Пароль должен содержать от 3 до 32 символов!" })
  password?: string;
}
