import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite.dto';
import { UserAuthGuard } from 'src/user/user-auth.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  create(@Body() createFavoriteDto: FavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete()
  remove(@Body() removeFavoriteDto: FavoriteDto) {
    return this.favoriteService.remove(removeFavoriteDto);
  }
}
