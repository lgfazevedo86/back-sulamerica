import { Test, TestingModule } from '@nestjs/testing';
import { EspecialidadeService } from './especialidade.service';
import { Especialidade } from './entities/especialidade.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EspecialidadeService', () => {
  let service: EspecialidadeService;
  let repository: Repository<Especialidade>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EspecialidadeService,
        {
          provide: getRepositoryToken(Especialidade),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EspecialidadeService>(EspecialidadeService);
    repository = module.get<Repository<Especialidade>>(getRepositoryToken(Especialidade));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an Especialidade', async () => {
    const createEspecialidadeDto = {
      nm_especialidade: 'Cardiologia',
    };

    const createdEspecialidade = {
      codigo: 1, 
      nm_especialidade: createEspecialidadeDto.nm_especialidade,
    };

    mockRepository.create.mockReturnValue(createdEspecialidade);
    mockRepository.save.mockResolvedValue(createdEspecialidade);

    const result = await service.create(createEspecialidadeDto);

    expect(result).toEqual(createdEspecialidade);
    expect(mockRepository.create).toHaveBeenCalledWith(createEspecialidadeDto);
    expect(mockRepository.save).toHaveBeenCalledWith(createdEspecialidade);
  });

  it('should find all Especialidades', async () => {
    const mockEspecialidades = [
      {
        codigo: 1,
        nm_especialidade: 'Cardiologia',
      },
      {
        codigo: 2,
        nm_especialidade: 'Ortopedia',
      },
    ];

    mockRepository.find.mockResolvedValue(mockEspecialidades);

    const result = await service.findAll();

    expect(result).toEqual(mockEspecialidades);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one Especialidade', async () => {
    const id: number = 1;
    const mockEspecialidade = {
      codigo: 1,
      nm_especialidade: 'Cardiologia',
    };

    mockRepository.findOne.mockResolvedValue(mockEspecialidade);

    const result = await service.findOne(id);

    expect(result).toEqual(mockEspecialidade);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { codigo: id } });
  });

  it('should update an Especialidade', async () => {
    const id = 1;
    const updateEspecialidadeDto = {
      nm_especialidade: 'Ortopedia',
    };

    const updatedEspecialidade = {
      codigo: 1,
      nm_especialidade: updateEspecialidadeDto.nm_especialidade,
    };

    mockRepository.create.mockReturnValue(updatedEspecialidade);
    mockRepository.update.mockResolvedValue({ raw: [], generatedMaps: [], affected: 1 });

    const result = await service.update(id, updateEspecialidadeDto);

    expect(result).toEqual({ raw: [], generatedMaps: [], affected: 1 });
    expect(mockRepository.create).toHaveBeenCalledWith(updateEspecialidadeDto);
    expect(mockRepository.update).toHaveBeenCalledWith(id, updatedEspecialidade);
  });

  it('should remove an Especialidade', async () => {
    const id = 1;

    mockRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(id);

    expect(result).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith(id);
  });
});
