import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { BeneficiarioController } from './beneficiario.controller';
import { Beneficiario } from './entities/beneficiario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Beneficiario])],
  controllers: [BeneficiarioController],
  providers: [BeneficiarioService, Beneficiario]
})
export class BeneficiarioModule {}
