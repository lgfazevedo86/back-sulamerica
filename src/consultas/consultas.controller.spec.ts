import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasController } from './consultas.controller';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { Consulta } from './entities/consulta.entity';

class ConsultasServiceMock {
  create(createConsultaDto: CreateConsultaDto) {
    return createConsultaDto;
  }

  findAll() {
    return [new Consulta()];
  }

  findOne(id: string) {
    return new Consulta();
  }

  update(id: string, updateConsultaDto: any) {
    return { raw: [], generatedMaps: [], affected: 1 }; 
  }

  remove(id: string) {
    return { affected: 1 }; 
  }
}

describe('ConsultasController', () => {
  let controller: ConsultasController;
  let service: ConsultasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultasController],
      providers: [
        {
          provide: ConsultasService,
          useClass: ConsultasServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ConsultasController>(ConsultasController);
    service = module.get<ConsultasService>(ConsultasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Consulta', async () => {
      const createDto: CreateConsultaDto = {
        especialidade: 1,
        cpf: '12345678901',
        data: '2023-09-15',
        hora: '10:00',
      };

      const result = await controller.create(createDto);

      expect(result).toEqual(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of Consultas', async () => {
      const expectedResult = [new Consulta()];

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a Consulta', async () => {
      const id = '1';
      const expectedResult = new Consulta();

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a Consulta', async () => {
      const id = '1';
      const updateDto = {
        especialidade: 2,
        cpf: '98765432109',
        data: '2023-09-20',
        hora: '15:00',
      };

      const result = await controller.update(id, updateDto);

      expect(result).toBeTruthy();
    });
  });

  describe('remove', () => {
    it('should remove a Consulta', async () => {
      const id = '1';

      const result = await controller.remove(id);

      expect(result).toBeTruthy();
    });
  });
});
