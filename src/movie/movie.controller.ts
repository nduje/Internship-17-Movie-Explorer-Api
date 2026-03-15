import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    description: 'Fetch all movies',
  })
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Fetch movie',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }
}
