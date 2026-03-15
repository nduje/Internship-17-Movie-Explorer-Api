import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findFavorites(filters?: {
    search?: string;
    sortBy?: string;
    genre?: string;
  }) {
    const { search, sortBy = '', genre = '' } = filters || {};

    const where: any = {
      favorite: { isNot: null },
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

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: true,
        favorite: true,
      },
    });
  }
}
