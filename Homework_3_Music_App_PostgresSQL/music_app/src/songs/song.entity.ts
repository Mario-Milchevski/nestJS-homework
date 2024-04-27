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

@Entity()
export class Song {
    @PrimaryGeneratedColumn('uuid')
    
    id: string;

    @Column()

    name: string;

    @Column({
        nullable: true,
        name: 'artist_id',
    })

    artistId: string | null;

    @Column()

    duration: number;

    @Column()

    genre: string;

    @Column({
        name: 'release_date',
        nullable: true,
        type: Date,
    })

    releaseDate: Date;

    @ManyToOne(() => Artist, (artist) => artist.songs)
    @JoinColumn({
        name: 'artist_id',
    })

    artist: Artist;

    @CreateDateColumn({
        name: 'created_at',
    })
 
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
    })

    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
 
    deletedAt: Date;
}