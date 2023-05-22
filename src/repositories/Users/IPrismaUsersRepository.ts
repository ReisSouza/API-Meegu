import { Users } from '@prisma/client';
import { IGetAccountsDTO } from '../../UseCases/Users/Get/DTO/IGetAccountsDTO';

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

export interface IUpdateUser {
  id: string;
  email: string;
  name: string;
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
export interface IGetUserManyById {
  ids: string[];
}
export interface IDeleteById {
  id: string;
}
export interface IDeleteManyById {
  ids: string[];
}
export interface IVerifyIfEmailEqualWithId {
  id: string;
  email: string;
}

export interface ICreateReturn {
  id: string;
}

export abstract class IUsersRepository {
  abstract create(data: ICreateUser): Promise<ICreateReturn>;
  abstract update(data: IUpdateUser): Promise<void>;
  abstract getAll(data?: IGetAccountsDTO): Promise<Users[]>;
  abstract getByEmail(data: IGetUserByEmail): Promise<Users>;
  abstract getById(data: IGetUserById): Promise<Users>;
  abstract getManyById(data: IGetUserManyById): Promise<Users[]>;
  abstract deleteById(data: IDeleteById): Promise<void>;
  abstract deleteManyById(data: IDeleteManyById): Promise<void>;

  abstract getCount(): Promise<number>;
  abstract VerifyIfEmailEqualWithId(
    data: IVerifyIfEmailEqualWithId,
  ): Promise<Users>;
}
