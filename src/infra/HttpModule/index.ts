import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IViaCepResponse } from './types';

@Injectable()
export class HttpModuleService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<IViaCepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const responseGet = this.httpService.get(url);
    const response = await lastValueFrom(responseGet);

    return response.data;
  }
}
