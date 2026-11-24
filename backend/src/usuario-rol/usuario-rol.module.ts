import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../rol/entities/rol.entity.js';
import { Usuario } from '../usuario/entities/usuario.entity.js';
import { UsuarioRol } from './entities/usuario-rol.entity.js';
import { UsuarioRolController } from './usuario-rol.controller.js';
import { UsuarioRolService } from './usuario-rol.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRol, Usuario, Rol])],
  controllers: [UsuarioRolController],
  providers: [UsuarioRolService],
})
export class UsuarioRolModule {}
