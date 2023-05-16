import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import {
  IGetUserByEmail,
  UsersRepository,
  IGetUserById,
  IDeleteById,
} from './IPrismaUsersRepository';
import { PrismaService } from 'src/database/prisma.service';
import { IGetAccountsDTO } from 'src/UseCases/Users/Get/DTO/IGetAccountsDTO';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async deleteById(data: IDeleteById): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id: data.id,
      },
    });
  }

  async getById(data: IGetUserById): Promise<Users> {
    const resultGet = await this.prisma.users.findUnique({
      where: {
        id: data.id,
      },
    });

    return resultGet;
  }

  async getByEmail(data: IGetUserByEmail): Promise<Users> {
    const resultGet = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    return resultGet;
  }

  async getAll(data: IGetAccountsDTO): Promise<Users[]> {
    const resultGet = await this.prisma.users.findMany({
      where: {
        name: {
          contains: data?.name,
        },
      },
    });

    return resultGet;
  }

  async create(data: Users): Promise<void> {
    await this.prisma.users.create({
      data: { ...data },
    });
  }
}
