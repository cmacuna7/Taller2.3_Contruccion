import { IsBoolean, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

// Valida las altas de usuario (POST /usuario).
export class CreateUsuarioDto {
  @IsUUID('all', { message: 'id_persona debe ser un UUID' })
  id_persona: string;

  /** Como en AulaConecta: nombre.apellido en minúsculas */
  @IsString()
  @Matches(/^[a-z0-9._]{3,50}$/, { message: 'username debe tener de 3 a 50 letras minúsculas, números, punto o guion bajo' })
  username: string;

  /** Solo llega en la petición: se guarda su hash Argon2id, nunca el texto */
  @IsString()
  @MinLength(10, { message: 'password debe tener al menos 10 caracteres' })
  @MaxLength(128)
  password: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
