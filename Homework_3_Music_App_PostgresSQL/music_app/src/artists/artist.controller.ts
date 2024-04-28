import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { Artist } from './artist.entity';

// ------------------ PIPE -------------------

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
  }),
)
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  // ------------- GET METHOD ( GET ALL ) ----------------

  @Get()
  getArtists(@Query() query: ArtistQueryDto): Promise<Artist[]> {
    return this.artistService.getArtists(query);
  }

  @Get('genre/:genre')
  getArtistsByGenre(@Param('genre') genre: string): Promise<Artist[]> {
    return this.artistService.getArtistsByGenre(genre);
  }

  // ------------- GET METHOD ( GET ONE 'ID' ) ----------------

  @Get(':id')
  getArtist(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  // ------------- POST METHOD ( CREATE ) ----------------

  @Post()
  createArtist(@Body() body: ArtistCreateDto): Promise<Artist> {
    return this.artistService.createArtist(body);
  }

  // ------------- PUT METHOD ( UPDATE ) ----------------

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() body: ArtistUpdateDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, body);
  }

  // ------------- DELETE METHOD ----------------

  @Delete(':id')
  deleteArtist(@Param('id') id: string): Promise<void> {
    return this.artistService.deleteArtist(id)
  }
}