import { Song } from 'src/songs/song.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Artist {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        example: 'cd566a75-c19a-4385-9c2b-6940600312d4',
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        example: 'Ed Sheeran',
        required: true,
    })
    name: string;

    @Column()
    @ApiProperty({
        type: Number,
        example: 29,
    })
    age: number;

    @Column()
    @ApiProperty({
        type: String,
        example: 'UK',
    })
    country: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    @ApiProperty({
        type: Date,
        example: '2024-04-22T12:34:26.559Z',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    @ApiPropertyOptional({
        type: Date,
        example: '2024-04-22T12:34:26.559Z',
        nullable: true
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    @ApiPropertyOptional({
        type: Date,
        example: '2024-04-22T12:34:26.559Z',
        nullable: true
    })
    deletedAt: Date;

    @OneToMany(() => Song, (song) => song.artist)
    @ApiPropertyOptional({
        type: Song,
    })
    songs: Song[];
}