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

@Module({
  imports: [HttpModule],

  controllers: [CreateAccountController, GetAccountsController],
  providers: [
    PrismaService,
    CreateAccountUseCase,
    HttpModuleService,
    GetAccountsUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AppModule {}
