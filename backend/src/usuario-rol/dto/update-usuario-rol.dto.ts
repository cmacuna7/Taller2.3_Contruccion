import { IsBoolean } from 'class-validator';

// Revocar (estado = false) o volver a activar (estado = true) una asignación. El usuario y el rol no cambian:
// para otro rol se crea otra asignación.
export class UpdateUsuarioRolDto {
  @IsBoolean({ message: 'estado debe ser verdadero o falso' })
  estado: boolean;
}
