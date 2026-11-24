import { ArgumentsHost, Catch, ConflictException, BadRequestException, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

// Traduce los errores de PostgreSQL a respuestas HTTP claras, sin mostrar el SQL ni el nombre de la restricción.
const POR_CODIGO: Record<string, () => HttpException> = {
  // unique_violation: identificación, username, nombre de rol o pareja (usuario, rol) repetidos
  '23505': () => new ConflictException('El registro ya existe.'),
  // foreign_key_violation: apunta a un registro que no existe o se intenta borrar uno que está en uso
  '23503': () => new ConflictException('El registro está relacionado con otro: revisa las referencias.'),
  // invalid_text_representation: un UUID mal formado que se escapó de la validación
  '22P02': () => new BadRequestException('Un identificador no es válido.'),
};

@Catch()
export class FiltroErroresBd extends BaseExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): void {
    if (error instanceof QueryFailedError) {
      const codigo = (error.driverError as { code?: string } | undefined)?.code ?? '';
      const traducido = POR_CODIGO[codigo];
      if (traducido) {
        super.catch(traducido(), host);
        return;
      }
    }
    super.catch(error, host);
  }
}
