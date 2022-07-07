import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  create(dto: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepository.save(dto);
  }

  findAll(): Promise<CreateUserDto[]> {
    return this.userRepository.find();
  }

  async search(dto: SearchUserDto) {
    const qb = this.userRepository.createQueryBuilder("u");

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.fullName) {
      qb.andWhere(`u.fullName ILIKE :fullName`);
    }

    if (dto.email) {
      qb.andWhere(`u.email ILIKE :email`);
    }

    qb.setParameters({
      email: `%${dto.email}%`,
      fullName: `%${dto.fullName}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  findByCond(cond) {
    return this.userRepository.findOne({
      where: { email: cond.email, password: cond.password },
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepository.update(id, dto);
  }
}
