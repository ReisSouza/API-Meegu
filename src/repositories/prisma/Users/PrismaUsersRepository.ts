import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import {
  ICreateUser,
  IGetUserByEmail,
  UsersRepository,
} from './IPrismaUsersRepository';
import { PrismaService } from 'src/database/prisma.service';
import { IGetAccountsDTO } from 'src/UseCases/Users/Get/DTO/IGetAccountsDTO';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

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

  async create(data: ICreateUser): Promise<void> {
    await this.prisma.users.create({
      data: { ...data },
    });
  }
}
