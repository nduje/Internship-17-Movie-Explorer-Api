import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.movie.findMany({
      include: {
        genres: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: true,
      },
    });
  }
}
