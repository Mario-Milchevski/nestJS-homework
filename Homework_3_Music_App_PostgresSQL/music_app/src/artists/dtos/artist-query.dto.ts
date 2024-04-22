import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ArtistQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase())
    country?: string;

    @IsNumber()
    @IsOptional()
    id?: string;
}