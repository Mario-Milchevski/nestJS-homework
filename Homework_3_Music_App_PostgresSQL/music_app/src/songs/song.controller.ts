import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Put, Param, Delete } from '@nestjs/common';
import { SongService } from './song.service';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';
import { Song } from './song.entity';

@UsePipes(
    new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
    })
)
@Controller('songs')
export class SongsController {
    constructor(private readonly songService: SongService) { }

    // ------------- GET METHOD ( GET ALL ) ----------------

    @Get()
    getSongs(@Query() query: SongQueryDto): Promise<Song[]> {
        return this.songService.getSongs(query);
    }

    // ------------- GET METHOD ( GET ALL BY 'ARTIST ID' ) ----------------

    @Get('artist/:artistId')
    getArtistSongs(@Param('artistId') artistId: string): Promise<Song[]> {
        return this.songService.getArtistSongs(artistId)
    }

    // ------------- POST METHOD ( CREATE ) ----------------

    @Post()
    createSongs(@Body() body: SongCreateDto): Promise<Song> {
        return this.songService.createSong(body);
    }

    // ------------- PUT METHOD ( UPDATE ) ----------------

    @Put(':id')
    updateSong(
        @Param('id') id: string,
        @Body() body: SongUpdateDto): Promise<Song> {
        return this.songService.updateSong(id, body)
    }

    // ------------- DELETE METHOD ----------------

    @Delete(':id')
    deleteSong(@Param('id') id: string): Promise<void> {
        return this.songService.deleteSong(id)
    }
}
