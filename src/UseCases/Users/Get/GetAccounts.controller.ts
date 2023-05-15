import { Body, Controller, Get } from '@nestjs/common';
import { IGetAccountsDTO } from './DTO/IGetAccountsDTO';
import { GetAccountsUseCase } from './GetAccounts.UseCase';

@Controller('accounts')
export class GetAccountsController {
  constructor(private getAccountsUseCase: GetAccountsUseCase) {}

  @Get('')
  async GetAccounts(@Body() body: IGetAccountsDTO) {
    const { name } = body;

    const resultGet = await this.getAccountsUseCase.execute({
      name,
    });

    return resultGet;
  }
}
