import { Artist } from "src/artists/artist.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Genre } from "src/common/enums/genres.enum";

@Entity()
export class Song {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        description: 'The ID of the Song',
        example: 'cd566a75-c19a-4385-9c2b-6940600312d4',
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: 'The name of the Song',
        example: 'Shape of you',
        required: true,
    })
    name: string;

    @Column({
        nullable: true,
        name: 'artist_id',
    })
    @ApiProperty({
        type: String,
        nullable: true,
        description: 'The ID of the Artist who first released the song',
        example: 'cd566a75-c19a-4385-9c2b-6940600312d4',
    })
    artistId: string | null;

    @Column()
    @ApiProperty({
        type: Number,
        description: 'The duration of the Song in seconds',
        example: 180
    })
    duration: number;

    @Column({
        enum: Genre,
        enumName: 'Genre',
    })
    @ApiProperty({
        enum: Genre,
        example: Genre.POP,
      })
    genre: Genre;

    @Column({
        name: 'release_date',
        nullable: true,
        type: Date,
    })
    @ApiProperty({
        type: Date,
        description: 'Date when the song was first released',
        example: '2024-04-22',
    })
    releaseDate: Date;

    @ManyToOne(() => Artist, (artist) => artist.songs)
    @JoinColumn({
        name: 'artist_id',
    })
    @ApiPropertyOptional({
        type: Artist
    })
    artist: Artist;

    @CreateDateColumn({
        name: 'created_at',
    })
    @ApiProperty({
        type: Date,
        example: '2024-04-22T12:34:26.559Z',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
    })
    @ApiProperty({
        type: Date,
        example: '2024-04-22T12:34:26.559Z',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    @ApiProperty({
        type: Date,
        example: '2024-04-22T12:34:26.559Z',
    })
    deletedAt: Date;
}