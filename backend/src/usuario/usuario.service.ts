import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Persona } from '../persona/entities/persona.entity.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { Usuario } from './entities/usuario.entity.js';

// Parámetros mínimos de OWASP para Argon2id (los mismos de ms-identidad en AulaConecta)
const OPCIONES_HASH = { type: argon2.argon2id, memoryCost: 19_456, timeCost: 2, parallelism: 1 } as const;

/** Lo que devuelve la API: la cuenta sin el hash de la clave. */
export type UsuarioPublico = Omit<Usuario, 'password_hash' | 'persona'>;

const publico = ({ id_usuario, id_persona, username, estado, fecha_creacion }: Usuario): UsuarioPublico => ({
  id_usuario,
  id_persona,
  username,
  estado,
  fecha_creacion,
});

// Lógica CRUD de usuario. La clave nunca se guarda ni se devuelve en texto: solo su hash.
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly repositorio: Repository<Usuario>,
    @InjectRepository(Persona) private readonly personas: Repository<Persona>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<UsuarioPublico> {
    const persona = await this.personas.findOneBy({ id_persona: dto.id_persona });
    if (!persona) {
      throw new BadRequestException('La persona no existe.');
    }
    if (!persona.estado) {
      throw new BadRequestException('La persona está inactiva: no puede tener una cuenta.');
    }
    // Una persona que ya tiene cuenta o un username repetido: la clave única responde 409
    const usuario = this.repositorio.create({
      id_persona: dto.id_persona,
      username: dto.username,
      estado: dto.estado,
      password_hash: await argon2.hash(dto.password, OPCIONES_HASH),
    });
    return publico(await this.repositorio.save(usuario));
  }

  async findAll(): Promise<UsuarioPublico[]> {
    return (await this.repositorio.find({ order: { username: 'ASC' } })).map(publico);
  }

  async findOne(id: string): Promise<UsuarioPublico> {
    return publico(await this.buscar(id));
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<UsuarioPublico> {
    const usuario = await this.buscar(id);
    const { password, ...resto } = dto;
    this.repositorio.merge(usuario, resto);
    if (password !== undefined) {
      usuario.password_hash = await argon2.hash(password, OPCIONES_HASH);
    }
    return publico(await this.repositorio.save(usuario));
  }

  /** Una cuenta con roles asignados no se borra (409): primero se revocan, o se desactiva con estado = false. */
  async remove(id: string): Promise<void> {
    await this.repositorio.remove(await this.buscar(id));
  }

  private async buscar(id: string): Promise<Usuario> {
    const usuario = await this.repositorio.findOneBy({ id_usuario: id });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
    }
    return usuario;
  }
}
