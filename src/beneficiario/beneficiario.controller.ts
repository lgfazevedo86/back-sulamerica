import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeneficiarioService } from './beneficiario.service';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';


@ApiTags('Beneficiarios')
@Controller('beneficiario')
export class BeneficiarioController {
  constructor(private readonly beneficiarioService: BeneficiarioService) {}

  @Post()
  create(@Body() createBeneficiarioDto: CreateBeneficiarioDto) {
    return this.beneficiarioService.create(createBeneficiarioDto);
  }

  @Get()
  findAll() {
    return this.beneficiarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const beneficiario = await this.beneficiarioService.findOne(id);
    if (!beneficiario) {
      throw new NotFoundException('Beneficiário não encontrado');
    }
    return beneficiario;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeneficiarioDto: UpdateBeneficiarioDto) {
    return this.beneficiarioService.update(id, updateBeneficiarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.beneficiarioService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Beneficiário não encontrado para exclusão');
    }
    return { message: 'Beneficiário excluído com sucesso' };

  }
}
