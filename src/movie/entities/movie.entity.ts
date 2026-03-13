import { ApiProperty } from '@nestjs/swagger';
import { Genre } from 'src/genre/entities/genre.entity';

export class Movie {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  director: string;

  @ApiProperty({ type: [String] })
  actors: string[];

  @ApiProperty()
  plot: string;

  @ApiProperty({ type: () => [Genre] })
  genres: Genre[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
