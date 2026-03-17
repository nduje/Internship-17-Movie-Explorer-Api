import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
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
  create(@Req() req: any, @Body() createFavoriteDto: FavoriteDto) {
    const userId = req.user.id;
    return this.favoriteService.create(userId, createFavoriteDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete()
  remove(@Req() req: any, @Body() removeFavoriteDto: FavoriteDto) {
    const userId = req.user.id;
    return this.favoriteService.remove(userId, removeFavoriteDto);
  }
}
