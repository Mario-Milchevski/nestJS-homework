import { Module } from '@nestjs/common';
import { ArtistModule } from './artists/artist.module';
import { SongsModule } from './songs/song.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    DatabaseModule,
    ArtistModule,
    SongsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
