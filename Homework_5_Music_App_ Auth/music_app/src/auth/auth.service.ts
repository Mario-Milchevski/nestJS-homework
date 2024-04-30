import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserResponseDto } from 'src/user/dtos/user-response..dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }
    async register({ username, password, role }: RegisterDto): Promise<UserResponseDto> {
        const existingUser = await this.userService.getUserByUsername(username);
        if (existingUser) {
            throw new BadRequestException(`User with username ${username} already exists`,);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword,
            role
        };

        return this.userService.create(user);

    }

}
