import { IsOptional, IsUUID } from 'class-validator';

// GET /usuario-rol?id_usuario=... : roles de un usuario.
export class FiltroUsuarioRolDto {
  @IsOptional()
  @IsUUID('all', { message: 'id_usuario debe ser un UUID' })
  id_usuario?: string;
}
