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
  Req,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { UserAuthGuard } from 'src/user/user-auth.guard';

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

  @UseGuards(UserAuthGuard)
  @Get('favorites')
  @ApiOkResponse({
    description:
      'Fetch all movies favorited by the current user with optional filters',
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
    @Req() req: any,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('genre') genre?: string,
  ) {
    const userId = req.user.id;
    return this.movieService.findFavorites(userId, { search, sortBy, genre });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Fetch movie',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiOkResponse({
    description: 'Create movie',
  })
  create(@Body() CreateMovieDto: CreateMovieDto) {
    return this.movieService.create(CreateMovieDto);
  }

  @UseGuards(AdminAuthGuard)
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

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete movie',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}
