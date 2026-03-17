import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createFavoriteDto: FavoriteDto) {
    const { movieId } = createFavoriteDto;

    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} does not exist`);
    }

    const existingFavorite = await this.prisma.favorite.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });

    if (existingFavorite) {
      throw new BadRequestException(
        `Movie with ID ${movieId} is already in favorites`,
      );
    }

    return this.prisma.favorite.create({
      data: { userId, movieId },
    });
  }

  async remove(userId: number, removeFavoriteDto: FavoriteDto) {
    const { movieId } = removeFavoriteDto;

    const favorite = await this.prisma.favorite.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });

    if (!favorite) {
      throw new NotFoundException(
        `Favorite for movie with ID ${movieId} does not exist`,
      );
    }

    return this.prisma.favorite.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  }
}
