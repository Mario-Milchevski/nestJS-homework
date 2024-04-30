import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { SongService } from './song.service';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';
import { Song } from './song.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiBody, ApiOperation, ApiResponse, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@UsePipes(
    new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
    })
)
@ApiTags('Songs')
@Controller('songs')
export class SongsController {
    constructor(private readonly songService: SongService) { }

    // ------------- GET METHOD ( GET ALL ) ----------------

    @Get()
    @ApiOperation({
        summary: 'Retrieve all songs'
    })
    @ApiOkResponse({
        status: 200,
        description: 'All songs are retrieved',
        type: [Song],
    })
    getSongs(@Query() query: SongQueryDto): Promise<Song[]> {
        return this.songService.getSongs(query);
    }

    // ------------- GET METHOD ( GET ALL BY 'ARTIST ID' ) ----------------

    @Get('artist/:artistId')
    @ApiOperation({
        summary: 'Retrieve all songs by certain Artist'
    })
    @ApiOkResponse({
        status: 200,
        description: `All songs by the artist are retrieved`,
        type: [Song],
    })
    @ApiParam({
        name: 'artistId',
        type: String,
        description: 'Artist ID',
    })
    getArtistSongs(@Param('artistId') artistId: string): Promise<Song[]> {
        return this.songService.getArtistSongs(artistId)
    }

    // ------------- POST METHOD ( CREATE ) ----------------

    @Post()
    @ApiOperation({ summary: 'Create a new song' })
    @ApiCreatedResponse({
        description: `The song has been created successfully`,
        type: Song,
    })
    @ApiBody({
        type: SongCreateDto,
    })
    createSongs(@Body() body: SongCreateDto): Promise<Song> {
        return this.songService.createSong(body);
    }

    // ------------- PUT METHOD ( UPDATE ) ----------------

    @Put(':id')
    @ApiOperation({ summary: 'Update a song' })
    @ApiResponse({
        status: 200,
        description: 'Updated song successfully.',
        type: Song,
    })
    @ApiBody({
        type: SongUpdateDto,
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Song ID',
    })
    updateSong(
        @Param('id') id: string,
        @Body() body: SongUpdateDto): Promise<Song> {
        return this.songService.updateSong(id, body)
    }

    // ------------- DELETE METHOD ----------------

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a song'
    })
    @ApiResponse({
        status: 204,
        description: 'Successfully deleted song'
    })
    @HttpCode(204)
    deleteSong(@Param('id') id: string): Promise<void> {
        return this.songService.deleteSong(id)
    }
}
