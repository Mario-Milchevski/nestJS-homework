import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { ArtistResponseDto } from './dtos/artist-response.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
  })
)

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  @Get()
  getArtists(@Query() query: ArtistQueryDto): ArtistResponseDto[] {
    return this.artistService.getArtists(query);
  }
  @Get(':id')
  getArtist(@Param('id') id: string): ArtistResponseDto {
    const parsedId = Number(id)
    return this.artistService.getArtist(parsedId);
  }
  @Get(':id/songs')
  getArtistWithSongs(@Param('id') id: string): ArtistResponseDto[] {
    const parsedId = Number(id)
    return this.artistService.getArtistWithSongs(parsedId)
  }

  @Post()
  createArtist(@Body() body: ArtistCreateDto): ArtistResponseDto {
    return this.artistService.createArtist(body);
  }
  @Put(':id')
  updateArtist(
    @Body() body: ArtistUpdateDto,
    @Param('id') id: string,
  ): ArtistResponseDto {
    const parsedId = Number(id)
    return this.artistService.updateArtist(parsedId, body);
  }
  @Delete(':id')
  deleteArtist(@Param('id') id: string): void {
    const parsedId = Number(id)
    return this.artistService.deleteArtist(parsedId)
  }
}