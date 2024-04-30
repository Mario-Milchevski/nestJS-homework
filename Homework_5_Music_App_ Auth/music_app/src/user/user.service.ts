import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { UserResponseDto } from './dtos/user-response..dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async create(credentials: RegisterDto): Promise<UserResponseDto> {
        const user = this.userRepository.create(credentials);
        await this.userRepository.save(user);
        return {
            username: user.username,
            role: user.role
        };
    }
    async getUserByUsername(username: string): Promise<UserResponseDto> {
        return this.userRepository.findOneBy({
            username,
        })
    }
}
