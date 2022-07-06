import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "test",
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const data = { id: payload.sub, email: payload.email };
    // Дополнительно проверяем, существует ли вообще такой пользователь.
    // Даже если пришел токен
    const user = await this.userService.findByCond(data);

    if (!user) {
      throw new UnauthorizedException("Нет доступа к данной странице!");
    }

    return data;
  }
}
