import { Controller, Get, Param } from '@nestjs/common';

import { IGetAccountByIdDTO } from './DTO/IGetByIdAccountDTO';
import { GetAccountByIdUseCase } from './GetByIdAccount.UseCase';

@Controller('accounts')
export class GetAccountByIdController {
  constructor(private getAccountByIdUseCase: GetAccountByIdUseCase) {}

  @Get(':id')
  async GetAccounts(@Param() Params: IGetAccountByIdDTO) {
    const { id } = Params;

    const resultGet = await this.getAccountByIdUseCase.execute({
      id,
    });

    return resultGet;
  }
}
