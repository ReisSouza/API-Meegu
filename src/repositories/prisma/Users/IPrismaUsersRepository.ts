import { Users } from '@prisma/client';

import { IGetAccountsDTO } from 'src/UseCases/Users/Get/DTO/IGetAccountsDTO';

interface ICreateUser {
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
export interface IGetUserById {
  id: string;
}
export interface IDeleteById {
  id: string;
}

export abstract class UsersRepository {
  abstract create(data: ICreateUser): Promise<void>;
  abstract getAll(data?: IGetAccountsDTO): Promise<Users[]>;
  abstract getByEmail(data: IGetUserByEmail): Promise<Users>;
  abstract getById(data: IGetUserById): Promise<Users>;
  abstract deleteById(data: IDeleteById): Promise<void>;
}
