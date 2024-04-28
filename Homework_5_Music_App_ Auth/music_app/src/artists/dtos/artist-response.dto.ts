import { ArtistCreateDto } from "./artist-create.dto";
import { IsArray, IsDate } from "class-validator";

export class ArtistResponseDto extends ArtistCreateDto {

  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsArray()
  songs: number[];
}