import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AulaConecta - Microservicio 1: Identidad y usuarios';
  }
}
