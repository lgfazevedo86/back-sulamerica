import { Test, TestingModule } from '@nestjs/testing';
import { EspecialidadeController } from './especialidade.controller';
import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { Especialidade } from './entities/especialidade.entity';

class EspecialidadeServiceMock {
  create(createEspecialidadeDto: CreateEspecialidadeDto) {
    return createEspecialidadeDto;
  }

  findAll() {
    return [new Especialidade()];
  }

  findOne(id: number) {
    return new Especialidade();
  }

  update(id: number, updateEspecialidadeDto: any) {
    return true;
  }

  remove(id: number) {
    return true;
  }
}

describe('EspecialidadeController', () => {
  let controller: EspecialidadeController;
  let service: EspecialidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecialidadeController],
      providers: [
        {
          provide: EspecialidadeService,
          useClass: EspecialidadeServiceMock,
        },
      ],
    }).compile();

    controller = module.get<EspecialidadeController>(EspecialidadeController);
    service = module.get<EspecialidadeService>(EspecialidadeService);
  });

  describe('create', () => {
    it('should create a new Especialidade', async () => {
      const createDto: CreateEspecialidadeDto = {
        nm_especialidade: 'Cardiologia',
      };

      jest.spyOn(service, 'create');

      const result = await controller.create(createDto);

      expect(result).toBe(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of Especialidades', async () => {
      const expectedResult = [new Especialidade()];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return an Especialidade', async () => {
      const id = '1';
      const expectedResult = new Especialidade();

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toBe(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an Especialidade', async () => {
      const id = '1';
      const updateDto = {
        nm_especialidade: 'Pediatria',
      };

      jest.spyOn(service, 'update');

      const result = await controller.update(id, updateDto);

      expect(result).toBeTruthy();
    });
  });

  describe('remove', () => {
    it('should remove an Especialidade', async () => {
      const id = '1';

      jest.spyOn(service, 'remove');

      const result = await controller.remove(id);

      expect(result).toBeTruthy();
    });
  });
});
