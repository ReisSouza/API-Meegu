import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CreateAccountController } from './UseCases/Users/Create/CreateAccount.controller';
import { CreateAccountUseCase } from './UseCases/Users/Create/CreateAccount.UseCase';
import { HttpModule } from '@nestjs/axios';
import { HttpModuleService } from './infra/HttpModule';
import { PrismaUsersRepository } from './repositories/prisma/Users/PrismaUsersRepository';
import { UsersRepository } from './repositories/prisma/Users/IPrismaUsersRepository';
import { GetAccountsUseCase } from './UseCases/Users/Get/GetAccounts.UseCase';
import { GetAccountsController } from './UseCases/Users/Get/GetAccounts.controller';
import { GetAccountByIdUseCase } from './UseCases/Users/GetByIdAccount/GetByIdAccount.UseCase';
import { GetAccountByIdController } from './UseCases/Users/GetByIdAccount/GetByIdAccount.controller';

@Module({
  imports: [HttpModule],

  controllers: [
    CreateAccountController,
    GetAccountsController,
    GetAccountByIdController,
  ],
  providers: [
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
