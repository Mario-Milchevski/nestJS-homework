import { Transform } from "class-transformer";
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    IsUUID,
    MinLength
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Song } from "../song.entity";
import { Genre } from "src/common/enums/genres.enum";


export class SongCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    @ApiProperty({
        type: String,
        description: 'The name of the song',
        example: 'Shape of you',
        minimum: 3,
        required: true,

    })
    name: string;

    @IsUUID()
    @ApiProperty({
        type: String,
        description: "The ID of the song's Artist",
        example: 'cd566a75-c19a-4385-9c2b-6940600312d4',
    })
    artistId: string;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(3)
    // @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    // @ApiProperty({
    //     type: String,
    //     description: 'The name of the artist',
    //     example: 'Ed Sheeran',
    //     minimum: 3,

    // })
    // artistName: string;

    @IsInt()
    @ApiProperty({
        type: Number,
        description: 'The number of seconds of song duration',
        example: '180',
    })
    duration: number;

    @IsEnum(Genre)
    @ApiProperty({
        enum: Genre,
        description: 'The genre of the song',
        example: Genre.POP,
        required: true,
    })
    genre: Genre;

    @IsDateString()
    @ApiProperty({
        type: String,
        description: "The date of the song's release",
        example: '2024-04-22T12:34:26.559Z',
    })
    releaseDate: string;
}