import { Module } from '@nestjs/common';
import { EspecialidadeService } from './especialidade.service';
import { EspecialidadeController } from './especialidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Especialidade])],
  controllers: [EspecialidadeController],
  providers: [EspecialidadeService, Especialidade]
})
export class EspecialidadeModule {}
