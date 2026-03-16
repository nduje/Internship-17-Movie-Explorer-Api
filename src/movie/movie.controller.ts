import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    description: 'Fetch all movies with optional filters',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by movie title',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Sort movies',
  })
  @ApiQuery({
    name: 'genre',
    required: false,
    type: String,
    description: 'Filter by genre',
  })
  findAll(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('genre') genre?: string,
  ) {
    return this.movieService.findAll({ search, sortBy, genre });
  }

  @Get('favorites')
  @ApiOkResponse({
    description: 'Fetch all movies with optional filters',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by movie title',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Sort movies',
  })
  @ApiQuery({
    name: 'genre',
    required: false,
    type: String,
    description: 'Filter by genre',
  })
  findFavorites(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('genre') genre?: string,
  ) {
    return this.movieService.findFavorites({ search, sortBy, genre });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Fetch movie',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create movie',
  })
  create(@Body() CreateMovieDto: CreateMovieDto) {
    return this.movieService.create(CreateMovieDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update movie',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, UpdateMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete movie',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}
