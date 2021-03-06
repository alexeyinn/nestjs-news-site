import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard("local"))
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
