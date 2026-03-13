import { ApiProperty } from '@nestjs/swagger';

export class Genre {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
