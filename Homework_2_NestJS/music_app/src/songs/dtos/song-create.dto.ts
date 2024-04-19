import { Transform } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator";


export class SongCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    artist: string;

    @IsNumber()
    artistId: number;

    @IsInt()
    @Min(60)
    @Max(500)
    duration: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    genre: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    releaseDate: Date;
}