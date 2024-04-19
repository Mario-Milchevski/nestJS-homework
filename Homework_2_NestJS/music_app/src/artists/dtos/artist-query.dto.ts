import { Transform } from 'class-transformer';
import { IsOptional, IsString } from "class-validator";

export class ArtistQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase())
    country?: string;

    @IsOptional()
    id?: string;

    @IsOptional()
    genre?: any;
}