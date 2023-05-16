import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpModuleService } from './infra/HttpModule';
import { PrismaService } from './database/prisma.service';
import { GetAccountsUseCase } from './UseCases/Users/Get/GetAccounts.UseCase';
import { GetAccountsController } from './UseCases/Users/Get/GetAccounts.controller';
import { UsersRepository } from './repositories/prisma/Users/IPrismaUsersRepository';
import { CreateAccountUseCase } from './UseCases/Users/Create/CreateAccount.UseCase';
import { PrismaUsersRepository } from './repositories/prisma/Users/PrismaUsersRepository';
import { CreateAccountController } from './UseCases/Users/Create/CreateAccount.controller';
import { DeleteAccountByIdUseCase } from './UseCases/Users/Delete/DeleteAccountById.UseCase';
import { GetAccountByIdUseCase } from './UseCases/Users/GetByIdAccount/GetByIdAccount.UseCase';
import { DeleteAccountByIdController } from './UseCases/Users/Delete/DeleteAccountById.controller';
import { GetAccountByIdController } from './UseCases/Users/GetByIdAccount/GetByIdAccount.controller';

@Module({
  imports: [HttpModule],

  controllers: [
    DeleteAccountByIdController,
    CreateAccountController,
    GetAccountsController,
    GetAccountByIdController,
  ],
  providers: [
    DeleteAccountByIdUseCase,
    GetAccountByIdUseCase,
    GetAccountsUseCase,
    PrismaService,
    CreateAccountUseCase,
    HttpModuleService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AppModule {}
