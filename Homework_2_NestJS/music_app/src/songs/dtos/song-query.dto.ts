import { IsOptional, IsString } from "class-validator";

export class SongQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    artist?: string;

    @IsOptional()
    artistId?: number;

    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    genre?: any;

}