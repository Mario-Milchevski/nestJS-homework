import { Injectable } from '@nestjs/common';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongService {
    constructor(@InjectRepository(Song)
    private songRepository: Repository<Song>,) { }

    async getSongs({
        name,
        genre,
    }: SongQueryDto): Promise<Song[]> {
        let whereQuerry = {} satisfies FindOptionsWhere<Song>
        if (name) {
            whereQuerry = {
                ...whereQuerry,
                name: ILike(`%${name}%`),
            };
        }
        if (genre) {
            whereQuerry = {
                ...whereQuerry,
                genre: ILike(`%${genre}%`),
            };
        }
      
        return this.songRepository.find({

            relations: {
                artist: true,
            },
            where: whereQuerry
        });

    };
    async getArtistSongs(artistId: string): Promise<Song[]> {
        return this.songRepository.find({
            where: { artistId },
        });
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
        await this.songRepository.delete(id)
    }
}
