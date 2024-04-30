import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { Artist } from './artist.entity';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Song } from 'src/songs/song.entity';
import { Genre } from 'src/common/enums/genres.enum';

// ------------------ PIPE -------------------

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
  }),
)
@ApiTags('Artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  // ------------- GET METHOD ( GET ALL ) ----------------

  @Get()
  @ApiOperation({ summary: 'Retrieve all artists' })
  @ApiOkResponse({
    type: [Artist],
    description: 'All artists retrieved successfully',
  })
  getArtists(@Query() query: ArtistQueryDto): Promise<Artist[]> {
    return this.artistService.getArtists(query);
  }

  // ------------- GET METHOD ( GET ONE 'ID' ) ----------------

  @Get('genre/:genre')
  @ApiOperation({ summary: 'Retrieve an Artist by Genre' })
  @ApiOkResponse({
    description: 'Artists that have at least one song in certain genre is retrieved',
    type: Artist,
  })
  @ApiParam({
    name: 'genre',
    enum: Genre,
    description: 'Artist Genre',
  })
  getArtistsByGenre(@Param('genre') genre: Genre): Promise<Artist[]> {
    return this.artistService.getArtistsByGenre(genre);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an Artist' })
  @ApiOkResponse({
    description: 'Artist with certain ID is retrieved',
    type: Artist,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID',
  })
  getArtist(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  // ------------- POST METHOD ( CREATE ) ----------------

  @Post()
  @ApiOperation({ summary: 'Create a new Artist' })
  @ApiCreatedResponse({
    description: 'The Artist has been created successfully.',
    type: Artist,
  })
  @ApiBody({
    type: ArtistCreateDto,
  })
  createArtist(@Body() body: ArtistCreateDto): Promise<Artist> {
    return this.artistService.createArtist(body);
  }

  // ------------- PUT METHOD ( UPDATE ) ----------------

  @Put(':id')
  @ApiOperation({ summary: 'Update an Artist' })
  @ApiResponse({
    status: 200,
    description: 'Updated Artist successfully.',
    type: Artist,
  })
  @ApiBody({
    type: ArtistUpdateDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID',
  })
  updateArtist(
    @Param('id') id: string,
    @Body() body: ArtistUpdateDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, body);
  }

  // ------------- DELETE METHOD ----------------

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an Artist.',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted an Artist',
  })
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): Promise<void> {
    return this.artistService.deleteArtist(id)
  }
}