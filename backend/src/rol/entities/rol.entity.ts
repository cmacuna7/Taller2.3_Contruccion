import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Tabla rol: ADMIN, SECRETARIA, DOCENTE, REPRESENTANTE y ESTUDIANTE (database/02_roles_aulaconecta.sql).
@Entity({ name: 'rol' })
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string | null;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
