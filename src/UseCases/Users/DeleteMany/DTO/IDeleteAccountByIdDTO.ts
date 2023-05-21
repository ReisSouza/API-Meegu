import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class IDeleteAccountManyByIdDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];

  accessToken: string;
}
