import { Injectable, NotFoundException, Body, Query } from '@nestjs/common';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { FindOperator, Repository } from 'typeorm';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>,) { }
    async getArtists(query: ArtistQueryDto): Promise<Artist[]> {

        const artists = await this.artistRepository.find({
            relations: {
                songs: true,
            },
            where: {
                name: query.name,
                country: query.country,
                id: query.id,
            }
        });
        const songsByGenre = artists.map(artist => {
            const songsInGenre = artist.songs.filter(song => song.genre === query.genre)
            const songsGenreArtists = songsInGenre.filter(async song => {
                if (song) {
                    await this.getArtist(song.artistId)
                }
            })
            return songsGenreArtists
        })
        return artists
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
