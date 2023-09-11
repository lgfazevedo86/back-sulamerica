import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';
import { Beneficiario } from './entities/beneficiario.entity';

@Injectable()
export class BeneficiarioService {

  constructor(
    @InjectRepository(Beneficiario)
    private readonly repository: Repository<Beneficiario>
  ){}

  create(createBeneficiarioDto: CreateBeneficiarioDto) {
    let info = this.repository.create(createBeneficiarioDto);
    return this.repository.save(info);
    
  }

  findAll() {
    return this.repository.find();
  }

  findOne(cpf: string) {
    return this.repository.findOne({where: {cpf: cpf}})
  }

  update(id: string, updateBeneficiarioDto: UpdateBeneficiarioDto) {
    let info = this.repository.create(updateBeneficiarioDto);
    return this.repository.update(id, info)
  }

  remove(id: string) {
    return this.repository.delete(id);

  }
}
