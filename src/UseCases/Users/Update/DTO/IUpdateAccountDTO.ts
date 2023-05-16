import { Transform } from 'class-transformer';

import {
  Length,
  IsDate,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class IUpdateUserDTO {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  accessToken: string;

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthdate: Date;

  @IsString()
  document?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  zipcode: string;
}
