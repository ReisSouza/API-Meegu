import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CreateAccountController } from './UseCases/Users/Create/CreateAccount.controller';
import { CreateAccountUseCase } from './UseCases/Users/Create/CreateAccount.UseCase';
import { HttpModule } from '@nestjs/axios';
import { HttpModuleService } from './infra/HttpModule';
import { PrismaUsersRepository } from './repositories/prisma/Users/PrismaUsersRepository';
import { UsersRepository } from './repositories/prisma/Users/IPrismaUsersRepository';

@Module({
  imports: [HttpModule],

  controllers: [CreateAccountController],
  providers: [
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
