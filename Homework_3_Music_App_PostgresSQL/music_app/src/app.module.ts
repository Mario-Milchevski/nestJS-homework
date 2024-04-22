import { Module } from '@nestjs/common';
import { ArtistModule } from './artists/artist.module';
import { SongsModule } from './songs/song.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    DatabaseModule,
    ArtistModule,
    SongsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
