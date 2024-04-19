import { Module } from '@nestjs/common';
import { SongsController } from './song.controller';
import { SongService } from './song.service';
import { ArtistService } from 'src/artists/artist.service';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongService],
})
export class SongsModule { }
