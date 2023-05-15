import { UsersRepository } from 'src/repositories/prisma/Users/IPrismaUsersRepository';
import { IGetAccountByIdDTO } from './DTO/IGetByIdAccountDTO';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetAccountByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: IGetAccountByIdDTO) {
    const resultGet = await this.usersRepository.getById({ id });

    if (!resultGet) {
      throw new NotFoundException('Usuário não existe');
    }

    return {
      account: resultGet,
      message: 'success',
    };
  }
}
