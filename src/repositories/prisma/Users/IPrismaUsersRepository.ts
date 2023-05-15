import { Users } from '@prisma/client';
import { IGetAccountsDTO } from 'src/UseCases/Users/Get/DTO/IGetAccountsDTO';

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  birthdate: Date;
  document: string;
  acceptedTermsAndConditions: boolean;
  zipcode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface IGetUserByEmail {
  email: string;
}

export abstract class UsersRepository {
  abstract create(data: ICreateUser): Promise<void>;
  abstract getByEmail(data: IGetUserByEmail): Promise<Users>;
  abstract getAll(data?: IGetAccountsDTO): Promise<Users[]>;
}