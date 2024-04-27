import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ArtistQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase())
    country?: string;

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    genre?: string;
}