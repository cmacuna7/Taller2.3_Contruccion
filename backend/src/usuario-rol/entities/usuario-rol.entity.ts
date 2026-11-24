import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, type Relation } from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity.js';
import { Usuario } from '../../usuario/entities/usuario.entity.js';

// Tabla usuario_rol: resuelve la relación N:M entre usuario y rol. La pareja (usuario, rol) no se repite.
@Entity({ name: 'usuario_rol' })
@Unique('uq_usuario_rol', ['id_usuario', 'id_rol'])
export class UsuarioRol {
  @PrimaryGeneratedColumn('uuid')
  id_usuario_rol: string;

  @Column({ type: 'uuid' })
  id_usuario: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  usuario?: Relation<Usuario>;

  @Column({ type: 'uuid' })
  id_rol: string;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol', referencedColumnName: 'id_rol' })
  rol?: Relation<Rol>;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_asignacion: Date;

  /** false = rol revocado (se conserva el historial de la asignación) */
  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
