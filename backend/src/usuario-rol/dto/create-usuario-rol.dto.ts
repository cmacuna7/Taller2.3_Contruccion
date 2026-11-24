import { IsUUID } from 'class-validator';

// Asignar un rol a un usuario (POST /usuario-rol).
export class CreateUsuarioRolDto {
  @IsUUID('all', { message: 'id_usuario debe ser un UUID' })
  id_usuario: string;

  @IsUUID('all', { message: 'id_rol debe ser un UUID' })
  id_rol: string;
}
