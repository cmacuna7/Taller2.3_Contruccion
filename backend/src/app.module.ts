import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FiltroErroresBd } from './comun/filtro-errores-bd.js';
import { PersonaModule } from './persona/persona.module.js';
import { RolModule } from './rol/rol.module.js';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module.js';
import { UsuarioModule } from './usuario/usuario.module.js';

@Module({
  imports: [
    // La contraseña de PostgreSQL está en el .env de la raíz (el mismo que usa docker-compose.yml)
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../.env'] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('POSTGRES_PORT', '5434')),
        username: config.get<string>('DB_USER', 'identidad'),
        password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('DB_NAME', 'db_identidad'),
        autoLoadEntities: true,
        // Las tablas se crean con SQL (database/01_schema.sql): TypeORM solo las mapea, nunca las cambia
        synchronize: false,
      }),
    }),
    PersonaModule,
    RolModule,
    UsuarioModule,
    UsuarioRolModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: FiltroErroresBd }],
})
export class AppModule {}
