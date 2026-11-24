import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto.js';
import { FiltroUsuarioRolDto } from './dto/filtro-usuario-rol.dto.js';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto.js';
import { UsuarioRolService } from './usuario-rol.service.js';

// Rutas HTTP de usuario_rol: asignar (POST), consultar (GET), revocar o reactivar (PATCH) y quitar (DELETE).
@Controller('usuario-rol')
export class UsuarioRolController {
  constructor(private readonly usuarioRolService: UsuarioRolService) {}

  @Post()
  create(@Body() createUsuarioRolDto: CreateUsuarioRolDto) {
    return this.usuarioRolService.create(createUsuarioRolDto);
  }

  @Get()
  findAll(@Query() { id_usuario }: FiltroUsuarioRolDto) {
    return this.usuarioRolService.findAll(id_usuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioRolService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUsuarioRolDto: UpdateUsuarioRolDto) {
    return this.usuarioRolService.update(id, updateUsuarioRolDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioRolService.remove(id);
  }
}
