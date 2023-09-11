import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { Especialidade } from './entities/especialidade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadeService {

  constructor(
    @InjectRepository(Especialidade)
    private readonly repository: Repository<Especialidade>
  ){}


  create(createEspecialidadeDto: CreateEspecialidadeDto) {
    let info = this.repository.create(createEspecialidadeDto);
    return this.repository.save(info);
  }

  findAll() {
    return this.repository.find();
    
  }

  findOne(id: number) {
    return this.repository.findOne({where: {codigo: id}})

  }

  update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    let info = this.repository.create(updateEspecialidadeDto);
    return this.repository.update(id, info)
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
