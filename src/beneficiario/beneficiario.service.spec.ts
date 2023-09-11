import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiarioService } from './beneficiario.service';
import { Beneficiario } from './entities/beneficiario.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BeneficiarioService', () => {
  let service: BeneficiarioService;
  let repository: Repository<Beneficiario>;

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
        BeneficiarioService,
        {
          provide:getRepositoryToken(Beneficiario),
          useValue:mockRepository
        },
      ],
    }).compile();

    service = module.get<BeneficiarioService>(BeneficiarioService);
    repository = module.get<Repository<Beneficiario>>(getRepositoryToken(Beneficiario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a Beneficiario', async () => {
    const createBeneficiarioDto = {
      cpf: '12345678901',
      nome: 'João da Silva',
      data_nascimento: '1990-01-01',
    };

    const createdBeneficiario = {
      cpf: createBeneficiarioDto.cpf,
      nome: createBeneficiarioDto.nome,
      data_nascimento: createBeneficiarioDto.data_nascimento,
    };

    mockRepository.create.mockReturnValue(createdBeneficiario);
    mockRepository.save.mockResolvedValue(createdBeneficiario);

    const result = await service.create(createBeneficiarioDto);

    expect(result).toEqual(createdBeneficiario);
    expect(mockRepository.create).toHaveBeenCalledWith(createBeneficiarioDto);
    expect(mockRepository.save).toHaveBeenCalledWith(createdBeneficiario);
  });

  it('should find all Beneficiarios', async () => {
    const mockBeneficiarios = [
      {
        cpf: '12345678901',
        nome: 'João da Silva',
        data_nascimento: '1990-01-01',
      },
      {
        cpf: '98765432109',
        nome: 'Maria Oliveira',
        data_nascimento: '1985-05-20',
      },
    ];

    mockRepository.find.mockResolvedValue(mockBeneficiarios);

    const result = await service.findAll();

    expect(result).toEqual(mockBeneficiarios);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one Beneficiario', async () => {
    const id:string = '12345678901';
    const mockBeneficiario = {
      cpf: '12345678901',
      nome: 'João da Silva',
      data_nascimento: '1990-01-01',
    };

    mockRepository.findOne.mockResolvedValue(mockBeneficiario);

    const result = await service.findOne(id);

    expect(result).toEqual(mockBeneficiario);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { cpf: id } });

  });

  it('should update a Beneficiario', async () => {
    const id = '12345678901';
    const updateBeneficiarioDto = {
      nome: 'João Silva',
      data_nascimento: '1990-01-01',
    };

    const updatedBeneficiario = {
      cpf: '12345678901',
      nome: updateBeneficiarioDto.nome,
      data_nascimento: updateBeneficiarioDto.data_nascimento,
    };

    mockRepository.create.mockReturnValue(updatedBeneficiario);
    mockRepository.update.mockResolvedValue({ raw: [], generatedMaps: [],affected: 1 });

    const result = await service.update(id, updateBeneficiarioDto);

    expect(result).toEqual({ raw: [], generatedMaps: [],affected: 1 });
    expect(mockRepository.create).toHaveBeenCalledWith(updateBeneficiarioDto);
    expect(mockRepository.update).toHaveBeenCalledWith(id, updatedBeneficiario);
  });

  it('should remove a Beneficiario', async () => {
    const id = '1';

    mockRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(id);

    expect(result).toEqual({"affected": 1});
    expect(mockRepository.delete).toHaveBeenCalledWith(id);
  });
});
