import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class ArtistCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    @ApiProperty({
        type: String,
        example: 'Tose Proeski',
        description: 'Name of the artist. Singer or band',
        minimum: 3,
        required: true,

    })
    name: string;

    @IsInt()
    @IsNotEmpty()
    @Min(2)
    @Max(100)
    @ApiProperty({
        type: Number,
        example: '52',
        description: 'Age of the artist',
        minimum: 2,
        maximum: 100,
    })
    age: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @Transform(({ value }) => value.trim().replace(/\s{2,}/g, ' '))
    @ApiProperty({
        type: String,
        example: 'Macedonia',
        description: 'Country of the artist',
        minimum: 2,
    })
    country: string;
}