import { Injectable, NotFoundException } from '@nestjs/common';
import { SongResponseDto } from './dtos/song-response.dto';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';

@Injectable()
export class SongService {
    songs: SongResponseDto[] = [
        {
            "id": 0,
            "name": "Boogies wonderland",
            "artist": "Earth, Wind and Fire",
            "artistId": 0,
            "duration": 209,
            "genre": "Funk",
            "releaseDate": new Date("1979-06-10"),
            "createdAt": new Date("2024-04-14"),
            "updatedAt": new Date("2024-04-14"),
        },
        {
            "id": 1,
            "name": "Lets groove",
            "artist": "Earth, Wind and Fire",
            "artistId": 0,
            "duration": 209,
            "genre": "Funk",
            "releaseDate": new Date("1979-06-10"),
            "createdAt": new Date("2024-04-14"),
            "updatedAt": new Date("2024-04-14"),
        },
        {
            "id": 2,
            "name": "September",
            "artist": "Earth, Wind and Fire",
            "artistId": 0,
            "duration": 209,
            "genre": "Funk",
            "releaseDate": new Date("1979-06-10"),
            "createdAt": new Date("2024-04-14"),
            "updatedAt": new Date("2024-04-14"),
        },
        {
            "id": 3,
            "name": "Atlantis is calling",
            "artist": "Modern Talking",
            "artistId": 1,
            "duration": 209,
            "genre": "Euro Disco",
            "releaseDate": new Date("1979-06-10"),
            "createdAt": new Date("2024-04-14"),
            "updatedAt": new Date("2024-04-14"),
        },
    ];
    getSongs(query: SongQueryDto): SongResponseDto[] {
        let filteredSongs = [...this.songs]
        const parsedId = Number(query.id)

        if (query.genre) {
            filteredSongs = filteredSongs.filter(song => song.genre === query.genre)
        }
        if (query.artist) {
            filteredSongs = filteredSongs.filter(song => song.artist === query.artist)
        }
        if (query.artistId) {
            filteredSongs = filteredSongs.filter(song => song.artistId === Number(query.artistId))
        }
        if (query.name) {
            filteredSongs = filteredSongs.filter(song => song.name === query.name)
        }
        if (query.id) {
            filteredSongs = filteredSongs.filter(song => song.artistId === parsedId)
        }
        if (query === String) {
            filteredSongs = filteredSongs.filter(song => song.genre === query)
        }
        return filteredSongs;
    }

    getSongsByArtistId(artistId: number): SongResponseDto[] {
        const songs = [...this.songs]
        const filteredSongs = songs.filter(song => song.artistId === artistId)
        return filteredSongs;
    }

    createSong(songData: SongCreateDto): SongResponseDto {
        const artistId = songData.artistId

        const song = {
            ...songData,
            id: this.songs.length,
            artistId: artistId,
            createdAt: new Date(),
            updatedAt: new Date(),
        } satisfies SongResponseDto;

        this.songs.push(song);
        return song;
    }

    updateSong(updateData: SongUpdateDto, id: number): SongResponseDto {
        const index = this.songs.findIndex(song => song.id === id)
        if (index < 0) throw new NotFoundException(`Song with id ${id} doesnt't exist`)

        this.songs[index] = {
            ...this.songs[index],
            ...updateData,
            updatedAt: new Date(),
        };
        return this.songs[index];
    };
    deleteSong(id: number): void {
        this.songs = this.songs.filter(song => song.id !== id)
    }
}
