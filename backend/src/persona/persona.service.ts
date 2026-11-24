import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/update-persona.dto.js';
import { Persona } from './entities/persona.entity.js';

// Lógica CRUD de persona sobre PostgreSQL. Los duplicados de identificación los frena la clave única
// de la tabla y FiltroErroresBd responde 409.
@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private readonly repositorio: Repository<Persona>) {}

  create(dto: CreatePersonaDto): Promise<Persona> {
    return this.repositorio.save(this.repositorio.create(dto));
  }

  findAll(): Promise<Persona[]> {
    return this.repositorio.find({ order: { apellidos: 'ASC', nombres: 'ASC' } });
  }

  async findOne(id: string): Promise<Persona> {
    const persona = await this.repositorio.findOneBy({ id_persona: id });
    if (!persona) {
      throw new NotFoundException(`No existe la persona ${id}`);
    }
    return persona;
  }

  async update(id: string, dto: UpdatePersonaDto): Promise<Persona> {
    const persona = await this.findOne(id);
    return this.repositorio.save(this.repositorio.merge(persona, dto));
  }

  /** Si la persona ya tiene cuenta de usuario, la llave foránea lo impide y se responde 409. */
  async remove(id: string): Promise<void> {
    const persona = await this.findOne(id);
    await this.repositorio.remove(persona);
  }
}
