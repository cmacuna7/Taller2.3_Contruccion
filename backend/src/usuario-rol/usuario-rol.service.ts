import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../rol/entities/rol.entity.js';
import { Usuario } from '../usuario/entities/usuario.entity.js';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto.js';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto.js';
import { UsuarioRol } from './entities/usuario-rol.entity.js';

// Asignar y revocar roles. La restricción UNIQUE(id_usuario, id_rol) evita asignar dos veces el mismo
// rol: si se intenta, FiltroErroresBd responde 409.
@Injectable()
export class UsuarioRolService {
  constructor(
    @InjectRepository(UsuarioRol) private readonly repositorio: Repository<UsuarioRol>,
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Rol) private readonly roles: Repository<Rol>,
  ) {}

  async create(dto: CreateUsuarioRolDto): Promise<UsuarioRol> {
    const usuario = await this.usuarios.findOneBy({ id_usuario: dto.id_usuario });
    if (!usuario) {
      throw new BadRequestException('El usuario no existe.');
    }
    const rol = await this.roles.findOneBy({ id_rol: dto.id_rol });
    if (!rol) {
      throw new BadRequestException('El rol no existe.');
    }
    if (!rol.estado) {
      throw new BadRequestException(`El rol ${rol.nombre} está inactivo.`);
    }
    const guardada = await this.repositorio.save(this.repositorio.create(dto));
    return this.findOne(guardada.id_usuario_rol);
  }

  findAll(id_usuario?: string): Promise<UsuarioRol[]> {
    return this.repositorio.find({
      where: id_usuario ? { id_usuario } : {},
      relations: { rol: true },
      order: { fecha_asignacion: 'ASC' },
    });
  }

  async findOne(id: string): Promise<UsuarioRol> {
    const asignacion = await this.repositorio.findOne({ where: { id_usuario_rol: id }, relations: { rol: true } });
    if (!asignacion) {
      throw new NotFoundException(`No existe la asignación ${id}`);
    }
    return asignacion;
  }

  /** Revoca (estado = false) o reactiva la asignación sin perder la fecha original. */
  async update(id: string, dto: UpdateUsuarioRolDto): Promise<UsuarioRol> {
    const asignacion = await this.findOne(id);
    asignacion.estado = dto.estado;
    await this.repositorio.save(asignacion);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repositorio.remove(await this.findOne(id));
  }
}
