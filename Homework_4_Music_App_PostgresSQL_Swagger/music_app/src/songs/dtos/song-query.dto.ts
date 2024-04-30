import { IsEnum, IsOptional, IsString } from "class-validator";
import { Genre } from "src/common/enums/genres.enum";
import { Song } from "../song.entity";

export class SongQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(Genre)
    @IsOptional()
    genre?: Genre;

}