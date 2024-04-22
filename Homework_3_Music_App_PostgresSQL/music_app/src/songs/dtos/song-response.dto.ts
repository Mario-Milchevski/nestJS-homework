import { IsDate } from "class-validator";
import { SongCreateDto } from "./song-create.dto";

export class SongResponseDto extends SongCreateDto {

  id: string;

  artistId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}