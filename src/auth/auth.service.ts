import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(LoginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: LoginUserDto.userEmail
      }
    });

    const match = await bcrypt.compare(
  LoginUserDto.userPassword,
  user.userPassword,
);

if (!match) throw new UnauthorizedException("No estas autorizado");

const payload = {
  user: user.userEmail,
  password: user.userPassword,
  userRoles: user.userRoles
};

const token = this.jwtService.sign(payload);

return token;
  }
}