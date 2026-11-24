import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity.js';

// Tabla usuario: credenciales de acceso, separadas de los datos personales.
// Cada usuario corresponde a una sola persona (id_persona único): relación persona 1 : 0..1 usuario.
@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column({ type: 'uuid', unique: true })
  id_persona: string;

  @OneToOne(() => Persona)
  @JoinColumn({ name: 'id_persona', referencedColumnName: 'id_persona' })
  persona?: Relation<Persona>;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  /** Hash Argon2id; select: false para que nunca salga en las consultas */
  @Column({ type: 'varchar', length: 255, select: false })
  password_hash: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;
}
