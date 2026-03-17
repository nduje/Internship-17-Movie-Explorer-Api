import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  findAll(filters?: { search?: string; sortBy?: string; genre?: string }) {
    const { search, sortBy = '', genre = '' } = filters || {};

    const where: any = {};
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    if (genre) {
      where.genres = { some: { name: genre } };
    }

    let orderBy: any = {};
    if (sortBy) {
      const [field, direction] = sortBy.split('-');
      orderBy[field] = direction || 'asc';
    } else {
      orderBy = { id: 'asc' };
    }

    return this.prisma.movie.findMany({
      where,
      include: {
        genres: true,
        favorite: true,
      },
      orderBy,
    });
  }

  findFavorites(
    userId: number,
    filters?: {
      search?: string;
      sortBy?: string;
      genre?: string;
    },
  ) {
    const { search, sortBy = '', genre = '' } = filters || {};

    const where: any = {
      favorite: { some: { userId } },
    };

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    if (genre) {
      where.genres = { some: { name: genre } };
    }

    let orderBy: any = {};
    if (sortBy) {
      const [field, direction] = sortBy.split('-');
      orderBy[field] = direction || 'asc';
    } else {
      orderBy = { id: 'asc' };
    }

    return this.prisma.movie.findMany({
      where,
      include: {
        genres: true,
        favorite: true,
      },
      orderBy,
    });
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: { genres: true, favorite: true },
    });

    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);

    return movie;
  }

  create(createMovieDto: CreateMovieDto) {
    const { genres, ...data } = createMovieDto;

    return this.prisma.movie.create({
      data: {
        ...data,
        genres: {
          connect: genres.map((id) => ({ id })),
        },
      },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.findOne(id);

    const { genres, ...data } = updateMovieDto;

    return this.prisma.movie.update({
      where: { id },
      data: {
        ...data,
        ...(genres && { genres: { set: genres.map((id) => ({ id })) } }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
