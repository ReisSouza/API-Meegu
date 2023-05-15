import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../rocket-members-repository';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Users): Promise<void> {
    await this.prisma.users.create({
      data: {
        ...data,
      },
    });
  }
}
