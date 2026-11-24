import { IsBoolean, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

// Valida las altas de rol (POST /rol).
export class CreateRolDto {
  /** En mayúsculas y sin espacios, como los roles de AulaConecta (ADMIN, DOCENTE...) */
  @IsString()
  @Matches(/^[A-Z][A-Z_]{2,49}$/, { message: 'nombre debe estar en mayúsculas, sin espacios (3 a 50 caracteres)' })
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
