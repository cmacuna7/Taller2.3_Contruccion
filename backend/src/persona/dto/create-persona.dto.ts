import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

// Valida las altas de persona (POST /persona).
export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos: string;

  /** Cédula, pasaporte o código de prueba: letras, números y guiones */
  @IsString()
  @Matches(/^[A-Za-z0-9-]{3,20}$/, { message: 'identificacion debe tener de 3 a 20 letras, números o guiones' })
  identificacion: string;

  @IsEmail({}, { message: 'correo debe ser un correo electrónico válido' })
  @MaxLength(150)
  correo: string;

  @IsOptional()
  @Matches(/^\+?[0-9 ]{7,20}$/, { message: 'telefono debe tener solo números (7 a 20)' })
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
