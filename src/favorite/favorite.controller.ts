import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: FavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Delete()
  remove(@Body() removeFavoriteDto: FavoriteDto) {
    return this.favoriteService.remove(removeFavoriteDto);
  }
}
