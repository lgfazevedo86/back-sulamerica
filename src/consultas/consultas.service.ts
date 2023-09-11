import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';

@Injectable()
export class ConsultasService {

  constructor(
    @InjectRepository(Consulta)
    private readonly repository: Repository<Consulta>
  ){}


  create(createConsultaDto: CreateConsultaDto) {
    let info = this.repository.create(createConsultaDto);
    return this.repository.save(info);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({where: {cod_consulta: id}})
  }

  update(id: number, updateConsultaDto: UpdateConsultaDto) {
    let info = this.repository.create(updateConsultaDto);
    return this.repository.update(id, info)
    }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
