import { Body, Controller, Post } from '@nestjs/common';
import { ICreateUserDTO } from './DTO/ICreateUsersDTO';
import { CreateAccountUseCase } from './CreateAccount.UseCase';

@Controller('account')
export class AppController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post('')
  async CreateAccount(@Body() body: ICreateUserDTO) {
    const {
      acceptedTermsAndConditions,
      birthdate,
      document,
      password,
      zipcode,
      email,
      name,
    } = body;

    const resultCreate = await this.createAccountUseCase.execute({
      acceptedTermsAndConditions,
      birthdate,
      document,
      password,
      zipcode,
      email,
      name,
    });

    return resultCreate;
  }
}
