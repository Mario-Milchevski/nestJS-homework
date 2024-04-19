import { query } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistResponseDto } from './dtos/artist-response.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { SongService } from 'src/songs/song.service';

@Injectable()
export class ArtistService {
    constructor(private readonly songService: SongService) { }

    artists: ArtistResponseDto[] = [
        {
            "name": "Earth, Wind and Fire",
            "age": 55,
            "country": "US",
            "id": 0,
            "createdAt": new Date("2024-04-14"),
            "updatedAt": new Date("2024-04-14"),
        },
        {
            "name": "Modern Talking",
            "age": 55,
            "country": "Germany",
            "id": 1,
            "createdAt": new Date("2024-04-17T11:14:37.351Z"),
            "updatedAt": new Date("2024-04-17T11:14:37.351Z"),
        }

    ];
    getArtists(query: ArtistQueryDto): ArtistResponseDto[] {
        let filteredArtists = [...this.artists];
        const parsedId = Number(query.id);
        if (query.country) {
            filteredArtists = filteredArtists.filter(artist => artist.country === query.country);
        }
        if (query.name) {
            filteredArtists = filteredArtists.filter(artist => artist.name === query.name);
        }
        if (query.id) {
            filteredArtists = filteredArtists.filter(artist => artist.id === parsedId)
        }
        if (query.genre) {
            let uniqueArtistIds: number[];
            let songsOfThisGenre = this.songService.getSongs(query.genre);
            uniqueArtistIds = songsOfThisGenre.map(song => song.artistId).filter((artistId, index, array) => array.indexOf(artistId) === index)

            filteredArtists = filteredArtists.filter(artist => uniqueArtistIds.includes(artist.id))
        }
        return filteredArtists;
    }

    getArtist(id: number): ArtistResponseDto {
        const artist = this.artists.find(artist => artist.id === id)
        return artist;
    }

    getArtistWithSongs(id: number): ArtistResponseDto[] {
        let artist = this.getArtist(id)
        let songs = this.songService.getSongsByArtistId(id)
        let artistWithSongs = {
            ...artist,
            songs
        }
        return [artistWithSongs]
    }

    createArtist(artistData: ArtistCreateDto): ArtistResponseDto {
        const artist = {
            ...artistData,
            id: this.artists.length,
            createdAt: new Date(),
            updatedAt: new Date(),
        } satisfies ArtistResponseDto;

        this.artists.push(artist);
        return artist;
    }
    updateArtist(id: number, updateData: ArtistUpdateDto): ArtistResponseDto {
        const index = this.artists.findIndex(artist => artist.id === id);
        if (index < 0) throw new NotFoundException(`Artist with id ${id} doesn't exist`);
        this.artists[index] = {
            ...this.artists[index],
            ...updateData,
            updatedAt: new Date(),
        };
        return this.artists[index];
    };

    deleteArtist(id: number): void {
        this.artists = this.artists.filter((artist) => artist.id !== id);

    }
}
