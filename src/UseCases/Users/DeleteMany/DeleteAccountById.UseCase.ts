import { IUsersRepository } from '../../../repositories/Users/IPrismaUsersRepository';
import { IDeleteAccountManyByIdDTO } from './DTO/IDeleteAccountByIdDTO';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteAccountManyByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ ids, accessToken }: IDeleteAccountManyByIdDTO) {
    const isValidToken = accessToken?.split(' ')[1];

    if (isValidToken !== process.env.SECRET_DELETE) {
      throw new NotFoundException('Usuário não tem autorização');
    }

    const resultGet = await this.usersRepository.getManyById({ ids });

    if (!resultGet) {
      throw new NotFoundException('Usuário não existe');
    }

    await this.usersRepository.deleteManyById({ ids });

    return {
      message: 'Usuário deletado com sucesso!',
    };
  }
}
