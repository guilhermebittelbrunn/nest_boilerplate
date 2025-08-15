import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import { DeleteStepService } from './deleteStep.service';

import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { fakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { FakeStepRepository } from '@/module/task/repositories/tests/repositories/fakeStep.repository';
import GenericErrors from '@/shared/core/logic/genericErrors';

describe('DeleteStepService', () => {
  let service: DeleteStepService;

  const stepRepoMock = new FakeStepRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteStepService,
        {
          provide: IStepRepositorySymbol,
          useValue: stepRepoMock,
        },
      ],
    }).compile();

    service = module.get<DeleteStepService>(DeleteStepService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a step successfully', async () => {
    const step = fakeStep();

    stepRepoMock.delete.mockResolvedValueOnce(true);

    const result = await service.execute(step.id.toValue());

    expect(result).toBeUndefined();
    expect(stepRepoMock.delete).toHaveBeenCalled();
  });

  it('should throw a not found error if step does not exist', async () => {
    stepRepoMock.delete.mockResolvedValueOnce(false);

    await expect(service.execute(faker.string.uuid())).rejects.toThrow(GenericErrors.NotFound);
  });
});
