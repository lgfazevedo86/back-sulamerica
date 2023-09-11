import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiarioController } from './beneficiario.controller';
import { BeneficiarioService } from './beneficiario.service';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';
import { Beneficiario } from './entities/beneficiario.entity';

class BeneficiarioServiceMock {
  create(createBeneficiarioDto: CreateBeneficiarioDto) {
    return createBeneficiarioDto; 
  }

  findAll() {
    return [new Beneficiario()]; 
  }

  findOne(id: string) {
    return new Beneficiario(); 
  }

  update(id: string, updateBeneficiarioDto: UpdateBeneficiarioDto) {
    const updatedBeneficiario = new Beneficiario();
    updatedBeneficiario.cpf = '12345678901';
    updatedBeneficiario.nome = 'Fulano de Tal Atualizado';
    updatedBeneficiario.data_nascimento = '1990-01-01';
    return updatedBeneficiario;
  }

  remove(id: string) {
    return true;
  }
}

describe('BeneficiarioController', () => {
  let controller: BeneficiarioController;
  let service: BeneficiarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficiarioController],
      providers: [
        {
          provide: BeneficiarioService,
          useClass: BeneficiarioServiceMock, 
        },
      ],
    }).compile();

    controller = module.get<BeneficiarioController>(BeneficiarioController);
    service = module.get<BeneficiarioService>(BeneficiarioService);
  });

  describe('create', () => {
    it('should create a new Beneficiario', async () => {
      const createDto: CreateBeneficiarioDto = {
        cpf: '12345678901', 
        nome: 'Fulano de Tal', 
        data_nascimento: '1990-01-01', 
      };

      jest.spyOn(service, 'create'); 

      const result = await controller.create(createDto);

      expect(result).toBe(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of Beneficiarios', async () => {
      const expectedResult = [new Beneficiario()];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a Beneficiario', async () => {
      const id = '1';
      const expectedResult = new Beneficiario();

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult); 

      const result = await controller.findOne(id);

      expect(result).toBe(expectedResult);
    });
  });
  
  describe('update', () => {
    it('should update a Beneficiario', async () => {
      const id = '1';
      const updateDto: UpdateBeneficiarioDto = {
        nome: 'Fulano de Tal Atualizado',
      };
  
      jest.spyOn(service, 'update').mockResolvedValue(service.update(id, updateDto));
  
      const expectedResult = await service.update(id, updateDto); 
  
      const result = await controller.update(id, updateDto);
  
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a Beneficiario', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue({raw:[],affected:1}); 

      const result = await controller.remove(id);

      expect(result).toEqual({"message": "Beneficiário excluído com sucesso"});
    });
  });
});
