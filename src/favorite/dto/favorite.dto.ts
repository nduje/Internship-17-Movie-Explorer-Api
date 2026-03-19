import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteDto {
  @ApiProperty()
  @IsNumber()
  movieId: number;
}
