import { Transform } from "class-transformer";
import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsString,
    IsUUID,
    MinLength
} from "class-validator";


export class SongCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    name: string;

    @IsUUID()
    artistId: string;

    @IsInt()
    duration: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    genre: string;

    @IsDateString()
    releaseDate: string;
}