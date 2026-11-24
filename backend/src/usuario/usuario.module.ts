import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from '../persona/entities/persona.entity.js';
import { Usuario } from './entities/usuario.entity.js';
import { UsuarioController } from './usuario.controller.js';
import { UsuarioService } from './usuario.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Persona])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
