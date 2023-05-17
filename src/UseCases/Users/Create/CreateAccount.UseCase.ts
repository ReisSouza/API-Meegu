import * as dayjs from 'dayjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import { HttpModuleService } from 'src/infra/HttpModule';
import { ICreateUserDTO } from './DTO/ICreateAccountDTO';
import { UsersRepository } from 'src/repositories/prisma/Users/IPrismaUsersRepository';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private httpModuleService: HttpModuleService,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    acceptedTermsAndConditions,
    birthdate,
    password,
    document,
    zipcode,
    email,
    name,
  }: ICreateUserDTO) {
    if (dayjs().diff(birthdate, 'year') < 18) {
      throw new NotFoundException('Você precisa ter 18 anos');
    }

    const resultGetByEmail = await this.usersRepository.getByEmail({
      email,
    });

    if (resultGetByEmail) {
      throw new NotFoundException('Usuário com este email já existe');
    }

    const resGetAddressByCep = await this.httpModuleService.getAddressByCep(
      zipcode,
    );

    await this.usersRepository.create({
      neighborhood: resGetAddressByCep.bairro,
      street: resGetAddressByCep.logradouro,
      city: resGetAddressByCep.localidade,
      birthdate: new Date(birthdate),
      state: resGetAddressByCep.uf,
      acceptedTermsAndConditions,
      zipcode: Number(zipcode),
      document,
      password,
      email,
      name,
    });

    return {
      message: 'Usuário cadastrado com sucesso!',
    };
  }
}
