import { IsOptional, IsString } from "class-validator";

export class SongQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    genre?: string;

}