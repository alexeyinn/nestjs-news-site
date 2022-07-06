import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<UserEntity, "password">> {
    const user = await this.userService.findByCond({
      email,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    const payload = { email: user.email, sub: user.id };

    return {
      ...userData,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const { password, ...user } = await this.userService.create(dto);
      return {
        ...user,
        access_token: this.jwtService.sign(user),
      };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
