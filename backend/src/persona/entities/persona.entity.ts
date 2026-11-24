import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Tabla persona: datos personales de docentes, estudiantes, representantes y personal del colegio.
// Los nombres de las propiedades son los mismos de las columnas (id_persona...), como en la guía.
@Entity({ name: 'persona' })
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  id_persona: string;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  /** Cédula o pasaporte; única */
  @Column({ type: 'varchar', length: 20, unique: true })
  identificacion: string;

  @Column({ type: 'varchar', length: 150 })
  correo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string | null;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
