import { Injectable, NotFoundException, Body, Query } from '@nestjs/common';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongService {
    constructor(@InjectRepository(Song)
    private songRepository: Repository<Song>,) { }

    async getSongs(query: SongQueryDto): Promise<Song[]> {
        return this.songRepository.find({
            relations: {
                artist: true,
            },
        });
    };
    async getArtistSongs(artistId: string): Promise<Song[]> {
        return this.songRepository.findOneByOrFail({ artistId });
    };

    async createSong(body: SongCreateDto): Promise<Song> {

        const newSong: Song = this.songRepository.create(body);
        return this.songRepository.save(newSong);

    }

    async updateSong(id: string, body: SongUpdateDto): Promise<Song> {
        const song = await this.songRepository.findOneByOrFail({ id });
        const updatedSong = this.songRepository.merge(song, body);

        return this.songRepository.save(updatedSong);

    };
    async deleteSong(id: string): Promise<void> {
        // this.songs = this.songs.filter(song => song.id !== id)
        await this.songRepository.delete(id)
    }
}
