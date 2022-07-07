import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { SearchUserDto } from "./dto/search-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(dto);
  }

  @Get()
  findAll(): Promise<CreateUserDto[]> {
    return this.userService.findAll();
  }

  @Get("search")
  search(@Query() dto: SearchUserDto) {
    return this.userService.search(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me")
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.id, updateUserDto);
  }
}
