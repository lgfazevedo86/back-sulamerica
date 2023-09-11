import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasService } from './consultas.service';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';

describe('ConsultasService', () => {
  let service: ConsultasService;
  let repository: Repository<Consulta>;

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
        ConsultasService,
        {
          provide: getRepositoryToken(Consulta),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ConsultasService>(ConsultasService);
    repository = module.get<Repository<Consulta>>(getRepositoryToken(Consulta));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a Consulta', async () => {
    const createConsultaDto: CreateConsultaDto = {
      especialidade: 1,
      cpf: '12345678901',
      data: '2023-09-15',
      hora: '10:00',
    };

    const createdConsulta = {
      ...createConsultaDto,
      cod_consulta: 1, 
    };

    mockRepository.create.mockReturnValue(createdConsulta);
    mockRepository.save.mockResolvedValue(createdConsulta);

    const result = await service.create(createConsultaDto);

    expect(result).toEqual(createdConsulta);
    expect(mockRepository.create).toHaveBeenCalledWith(createConsultaDto);
    expect(mockRepository.save).toHaveBeenCalledWith(createdConsulta);
  });

  it('should find all Consultas', async () => {
    const mockConsultas = [
      {
        cod_consulta: 1,
        especialidade: 1,
        cpf: '12345678901',
        data: '2023-09-15',
        hora: '10:00',
        beneficiario: null, 
      },
    ];

    mockRepository.find.mockResolvedValue(mockConsultas);

    const result = await service.findAll();

    expect(result).toEqual(mockConsultas);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one Consulta', async () => {
    const id = 1;
    const mockConsulta = {
      cod_consulta: 1,
      especialidade: 1,
      cpf: '12345678901',
      data: '2023-09-15',
      hora: '10:00',
      beneficiario: null, 
    };

    mockRepository.findOne.mockResolvedValue(mockConsulta);

    const result = await service.findOne(id);

    expect(result).toEqual(mockConsulta);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { cod_consulta: id } });
  });

  it('should update a Consulta', async () => {
    const id = 1;
    const updateConsultaDto = {
      especialidade: 2,
      cpf: '98765432109',
      data: '2023-09-20',
      hora: '15:00',
    };

    const updatedConsulta = {
      cod_consulta: id,
      ...updateConsultaDto,
    };

    mockRepository.create.mockReturnValue(updatedConsulta);
    mockRepository.update.mockResolvedValue({ raw: [], generatedMaps: [], affected: 1 });

    const result = await service.update(id, updateConsultaDto);

    expect(result).toEqual({ raw: [], generatedMaps: [], affected: 1 });
    expect(mockRepository.create).toHaveBeenCalledWith(updateConsultaDto);
    expect(mockRepository.update).toHaveBeenCalledWith(id, updatedConsulta);
  });

  it('should remove a Consulta', async () => {
    const id = 1;

    mockRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(id);

    expect(result).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith(id);
  });
});
