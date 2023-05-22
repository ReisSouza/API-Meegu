import { Controller, Get, Query } from '@nestjs/common';
import { IGetAccountsDTO } from './DTO/IGetAccountsDTO';
import { GetAccountsUseCase } from './GetAccounts.UseCase';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class GetAccountsController {
  constructor(private getAccountsUseCase: GetAccountsUseCase) {}

  @Get('')
  @ApiQuery({ name: 'name', required: false, type: String })
  async GetAccounts(@Query() params: IGetAccountsDTO) {
    const { name, page, pageSize } = params;

    const resultGet = await this.getAccountsUseCase.execute({
      name,
      page,
      pageSize,
    });

    return resultGet;
  }
}
