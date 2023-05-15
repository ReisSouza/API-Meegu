import { UsersRepository } from 'src/repositories/prisma/Users/IPrismaUsersRepository';
import { IGetAccountsDTO } from './DTO/IGetAccountsDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAccountsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name }: IGetAccountsDTO) {
    const resultGet = await this.usersRepository.getAll({
      name,
    });

    return {
      data: {
        accounts: resultGet,
      },
      message: 'success',
    };
  }
}
