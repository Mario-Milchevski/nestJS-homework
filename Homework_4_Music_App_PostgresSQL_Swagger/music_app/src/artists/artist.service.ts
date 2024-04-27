import { Injectable, NotFoundException, Body, Query } from '@nestjs/common';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { FindOperator, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>,) { }
    async getArtists({
        name,
        country,
        id }: ArtistQueryDto): Promise<Artist[]> {

        let whereQuerry = {} satisfies FindOptionsWhere<Song>
        if (name) {
            whereQuerry = {
                ...whereQuerry,
                name: ILike(`%${name}%`),
            };
        }
        if (country) {
            whereQuerry = {
                ...whereQuerry,
                country: ILike(`%${country}%`),
            };
        }
        if (id) {
            whereQuerry = {
                ...whereQuerry,
                id: id
            };
        }
        return this.artistRepository.find({
            relations: {
                songs: true,
            },
            where: whereQuerry
        });

    }

    async getArtist(id: string): Promise<Artist> {
        return this.artistRepository.findOneByOrFail({ id })
    }

    async createArtist(body: ArtistCreateDto): Promise<Artist> {
        const newArtist = this.artistRepository.create(body);
        return this.artistRepository.save(newArtist)
    }
    async updateArtist(id: string, body: ArtistUpdateDto): Promise<Artist> {
        const artist = await this.artistRepository.findOneByOrFail({ id });
        const updatedArtist = this.artistRepository.merge(artist, body);
        return this.artistRepository.save(updatedArtist);
    };

    async deleteArtist(id: string): Promise<void> {
        await this.artistRepository.softDelete(id);
    }
}
