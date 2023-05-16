import * as dayjs from 'dayjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import { HttpModuleService } from 'src/infra/HttpModule';
import { IUpdateUserDTO } from './DTO/IUpdateAccountDTO';
import { UsersRepository } from 'src/repositories/prisma/Users/IPrismaUsersRepository';

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    private httpModuleService: HttpModuleService,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    accessToken,
    birthdate,
    document,
    zipcode,
    email,
    name,
    id,
  }: IUpdateUserDTO) {
    const isValidToken = accessToken?.split(' ')[1];

    if (isValidToken !== process.env.SECRET_TOKEN) {
      throw new NotFoundException('Usuário não tem autorização');
    }

    if (dayjs().diff(birthdate, 'year') < 18) {
      throw new NotFoundException('Você precisa ter 18 anos');
    }

    const resultGetByID = await this.usersRepository.getById({
      id,
    });

    if (!resultGetByID) {
      throw new NotFoundException('Usuário com este id não existe');
    }

    const resultGetByEmail =
      await this.usersRepository.VerifyIfEmailEqualWithId({
        email,
        id,
      });

    if (resultGetByEmail) {
      throw new NotFoundException('Usuário com este email já existe');
    }

    const resGetAddressByCep = await this.httpModuleService.getAddressByCep(
      zipcode,
    );

    const resultUpdate = await this.usersRepository.updated({
      neighborhood: resGetAddressByCep.bairro,
      street: resGetAddressByCep.logradouro,
      city: resGetAddressByCep.localidade,
      birthdate: new Date(birthdate),
      state: resGetAddressByCep.uf,
      zipcode: Number(zipcode),
      document,
      email,
      name,
      id,
    });

    return {
      message: 'Usuário atualizado com sucesso!',
      account: resultUpdate,
    };
  }
}
