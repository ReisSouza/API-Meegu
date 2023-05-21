import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

import {
  IVerifyIfEmailEqualWithId,
  IUsersRepository,
  IGetUserByEmail,
  ICreateReturn,
  IGetUserById,
  IDeleteById,
  ICreateUser,
  IUpdateUser,
  IDeleteManyById,
  IGetUserManyById,
} from '../IPrismaUsersRepository';
import { PrismaService } from '../../../database/prisma.service';
import { IGetAccountsDTO } from '../../../UseCases/Users/Get/DTO/IGetAccountsDTO';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async update(data: IUpdateUser): Promise<void> {
    await this.prisma.users.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteById(data: IDeleteById): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id: data.id,
      },
    });
  }

  async deleteManyById(data: IDeleteManyById): Promise<void> {
    await this.prisma.users.deleteMany({
      where: {
        id: {
          in: data.ids,
        },
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

  async getManyById(data: IGetUserManyById): Promise<Users[]> {
    const results: Users[] = [];

    for (const id of data.ids) {
      const result = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      if (result) {
        results.push(result);
      }
    }

    return results;
  }

  async getByEmail(data: IGetUserByEmail): Promise<Users> {
    const resultGet = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    return resultGet;
  }

  async getAll({
    name,
    page = 1,
    pageSize = 8,
  }: IGetAccountsDTO): Promise<Users[]> {
    const skip = (page - 1) * pageSize;
    const resultGet = await this.prisma.users.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: +pageSize,
    });

    return resultGet;
  }

  async getCount(): Promise<number> {
    const resultGet = await this.prisma.users.count();

    return resultGet;
  }

  async create(data: ICreateUser): Promise<ICreateReturn> {
    const resultCreate = await this.prisma.users.create({
      data: { ...data },
    });

    return {
      id: resultCreate.id,
    };
  }

  async VerifyIfEmailEqualWithId({
    email,
    id,
  }: IVerifyIfEmailEqualWithId): Promise<Users> {
    const result = await this.prisma.users.findFirst({
      where: {
        AND: [
          { email },
          {
            AND: {
              id: {
                not: id,
              },
            },
          },
        ],
      },
    });
    return result;
  }
}
