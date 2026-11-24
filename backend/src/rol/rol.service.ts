import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto.js';
import { UpdateRolDto } from './dto/update-rol.dto.js';
import { Rol } from './entities/rol.entity.js';

// Lógica CRUD de rol. Un nombre repetido lo frena la clave única y FiltroErroresBd responde 409.
@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private readonly repositorio: Repository<Rol>) {}

  create(dto: CreateRolDto): Promise<Rol> {
    return this.repositorio.save(this.repositorio.create(dto));
  }

  findAll(): Promise<Rol[]> {
    return this.repositorio.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: string): Promise<Rol> {
    const rol = await this.repositorio.findOneBy({ id_rol: id });
    if (!rol) {
      throw new NotFoundException(`No existe el rol ${id}`);
    }
    return rol;
  }

  async update(id: string, dto: UpdateRolDto): Promise<Rol> {
    const rol = await this.findOne(id);
    return this.repositorio.save(this.repositorio.merge(rol, dto));
  }

  /** Un rol asignado a algún usuario no se borra (409): se desactiva con estado = false. */
  async remove(id: string): Promise<void> {
    await this.repositorio.remove(await this.findOne(id));
  }
}
