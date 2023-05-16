import { Request } from 'express';
import { Body, Controller, Put, Req } from '@nestjs/common';

import { IUpdateUserDTO } from './DTO/IUpdateAccountDTO';
import { UpdateAccountUseCase } from './UpdateAccount.UseCase';

@Controller('account')
export class UpdateAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  @Put()
  async UpdateAccount(@Body() body: IUpdateUserDTO, @Req() request: Request) {
    const { birthdate, document, zipcode, email, name, id } = body;

    const accessToken = request.headers.authorization;

    const resultUpdate = await this.updateAccountUseCase.execute({
      birthdate,
      document,
      zipcode,
      email,
      name,
      id,
      accessToken,
    });

    return resultUpdate;
  }
}
