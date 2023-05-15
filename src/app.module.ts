import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './repositories/rocket-members-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-rocket-members-repository';
import { AppController } from './UseCases/Users/Create/CreateAccount.controller';
import { CreateAccountUseCase } from './UseCases/Users/Create/CreateAccount.UseCase';
import { HttpModule } from '@nestjs/axios';
import { HttpModuleService } from './infra/HttpModule';

@Module({
  imports: [HttpModule],

  controllers: [AppController],
  providers: [
    PrismaService,
    CreateAccountUseCase,
    HttpModuleService,

    {
      provide: UsersRepository, // quando alguém usar esse
      useClass: PrismaUsersRepository, // aplica essa dependência
    },
  ],
})
export class AppModule {}
