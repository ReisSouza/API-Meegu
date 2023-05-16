import { Request } from 'express';
import { Controller, Delete, Param, Req } from '@nestjs/common';

import { IDeleteAccountByIdDTO } from './DTO/IDeleteAccountByIdDTO';
import { DeleteAccountByIdUseCase } from './DeleteAccountById.UseCase';

@Controller('accounts')
export class DeleteAccountByIdController {
  constructor(private deleteAccountByIdUseCase: DeleteAccountByIdUseCase) {}

  @Delete(':id')
  async GetAccounts(
    @Param() Params: IDeleteAccountByIdDTO,
    @Req() request: Request,
  ) {
    const { id } = Params;
    const accessToken = request.headers.authorization;

    const resultDelete = await this.deleteAccountByIdUseCase.execute({
      id,
      accessToken,
    });

    return resultDelete;
  }
}
