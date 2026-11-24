import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto.js';

// La persona de una cuenta no se cambia (se crea otra cuenta). Se pueden cambiar username, password y estado.
export class UpdateUsuarioDto extends PartialType(OmitType(CreateUsuarioDto, ['id_persona'] as const)) {}
