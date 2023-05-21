import { IUsersRepository } from '../../../repositories/Users/IPrismaUsersRepository';
import { IGetAccountsDTO } from './DTO/IGetAccountsDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAccountsUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, page, pageSize }: IGetAccountsDTO) {
    const resultGet = await this.usersRepository.getAll({
      name,
      page,
      pageSize,
    });

    return {
      data: {
        accounts: resultGet,
      },
      message: 'success',
    };
  }
}
