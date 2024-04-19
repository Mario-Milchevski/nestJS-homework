import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { SongService } from 'src/songs/song.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, SongService],
})
export class ArtistModule { }
