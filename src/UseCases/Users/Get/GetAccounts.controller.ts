import { Controller, Get, Query } from '@nestjs/common';

import { IGetAccountsDTO } from './DTO/IGetAccountsDTO';
import { GetAccountsUseCase } from './GetAccounts.UseCase';

@Controller('accounts')
export class GetAccountsController {
  constructor(private getAccountsUseCase: GetAccountsUseCase) {}

  @Get('')
  async GetAccounts(@Query() query: IGetAccountsDTO) {
    const { name, page, pageSize } = query;

    const resultGet = await this.getAccountsUseCase.execute({
      name,
      page,
      pageSize,
    });

    return resultGet;
  }
}
