interface ICreateUser {
  email: string;
  name: string;
  password: string;
  birthdate: Date;
  document: string;
  acceptedTermsAndConditions: boolean;
  zipcode: bigint;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export abstract class UsersRepository {
  abstract create(data: ICreateUser): Promise<void>;
}
