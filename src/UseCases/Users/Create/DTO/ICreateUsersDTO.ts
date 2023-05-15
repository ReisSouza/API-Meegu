import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class ICreateUserDTO {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthdate: Date;

  @IsString()
  document?: string;

  @IsNotEmpty()
  @IsBoolean()
  acceptedTermsAndConditions: boolean;

  @IsString()
  @IsNotEmpty()
  zipcode: string;
}
