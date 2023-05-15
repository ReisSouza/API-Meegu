import { UsersRepository } from 'src/repositories/rocket-members-repository';
import { ICreateUserDTO } from './DTO/ICreateUsersDTO';
import { Injectable } from '@nestjs/common';
import { HttpModuleService } from 'src/infra/HttpModule';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private createAccountRepository: UsersRepository,
    private httpModuleService: HttpModuleService,
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
    const resGetAddressByCep = await this.httpModuleService.getAddressByCep(
      zipcode,
    );

    await this.createAccountRepository.create({
      neighborhood: resGetAddressByCep.bairro,
      street: resGetAddressByCep.logradouro,
      city: resGetAddressByCep.localidade,
      birthdate: new Date(birthdate),
      state: resGetAddressByCep.uf,
      acceptedTermsAndConditions,
      zipcode: BigInt(zipcode),
      document,
      password,
      email,
      name,
    });

    return {
      message: 'success',
    };
  }
}
