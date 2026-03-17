import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite.dto';
import { UserAuthGuard } from 'src/user/user-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createFavoriteDto: FavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete()
  remove(@Body() removeFavoriteDto: FavoriteDto) {
    return this.favoriteService.remove(removeFavoriteDto);
  }
}
