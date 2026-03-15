import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: FavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Delete()
  remove(@Body() removeFavoriteDto: FavoriteDto) {
    return this.favoriteService.remove(removeFavoriteDto);
  }
}
