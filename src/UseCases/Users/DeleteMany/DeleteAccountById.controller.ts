import { Controller, Delete, Param, Req } from '@nestjs/common';
import { IDeleteAccountManyByIdDTO } from './DTO/IDeleteAccountByIdDTO';
import { Request } from 'express';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteAccountByIdUseCase } from '../Delete/DeleteAccountById.UseCase';

@Controller('accounts')
@ApiTags('Account')
@ApiBearerAuth()
export class DeleteAccountByIdController {
  constructor(private deleteAccountByIdUseCase: DeleteAccountByIdUseCase) {}
  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: String })
  async GetAccounts(
    @Param() Params: IDeleteAccountManyByIdDTO,
    @Req() request: Request,
  ) {
    const { ids } = Params;
    const accessToken = request.headers.authorization;

    const resultDelete = await this.deleteAccountByIdUseCase.execute({
      ids,
      accessToken,
    });

    return resultDelete;
  }
}
