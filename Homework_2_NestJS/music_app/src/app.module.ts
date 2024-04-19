import { Module } from '@nestjs/common';
import { ArtistModule } from './artists/artist.module';
import { SongsModule } from './songs/song.module';

@Module({
  imports: [ArtistModule, SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
