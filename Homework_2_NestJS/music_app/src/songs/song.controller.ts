import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Put, Param, Delete } from '@nestjs/common';
import { SongService } from './song.service';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongResponseDto } from './dtos/song-response.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';

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

    @Get()
    getSongs(@Query() query: SongQueryDto): SongResponseDto[] {
        return this.songService.getSongs(query);
    }
    @Get(':artistId')
    getSongsByArtistId(@Param('artistId') artistId: string): SongResponseDto[] {
        const parsedId = Number(artistId)
        return this.songService.getSongsByArtistId(parsedId);
    }
    @Post()
    createSongs(@Body() body: SongCreateDto): SongResponseDto {
        return this.songService.createSong(body);
    }
    @Put(':id')
    updateSong(@Param('id') id: string, @Body() body: SongUpdateDto): SongResponseDto {
        const parsedId = Number(id)
        return this.songService.updateSong(body, parsedId)
    }
    @Delete(':id')
    deleteSong(@Param('id') id: string) {
        const parsedId = Number(id)
        return this.songService.deleteSong(parsedId)
    }
}
