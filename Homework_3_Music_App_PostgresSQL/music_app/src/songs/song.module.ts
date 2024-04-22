import { Module } from '@nestjs/common';
import { SongsController } from './song.controller';
import { SongService } from './song.service';
import { ArtistService } from 'src/artists/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongService],
})
export class SongsModule { }
