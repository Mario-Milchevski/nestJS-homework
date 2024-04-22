import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>,) { }

    async getArtists(query: ArtistQueryDto): Promise<Artist[]> {
        return this.artistRepository.find({
            relations: {
                songs: true,
            }
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
