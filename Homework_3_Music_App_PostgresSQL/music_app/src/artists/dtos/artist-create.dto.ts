import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class ArtistCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    name: string;

    @IsInt()
    @IsNotEmpty()
    @Min(2)
    @Max(100)
    age: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    country: string;
}