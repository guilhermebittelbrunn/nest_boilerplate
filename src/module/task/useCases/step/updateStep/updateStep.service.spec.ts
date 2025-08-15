import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import UpdateStepErrors from './updateStep.error';
import { UpdateStepService } from './updateStep.service';

import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { fakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { FakeStepRepository } from '@/module/task/repositories/tests/repositories/fakeStep.repository';

describe('UpdateStepService', () => {
  let service: UpdateStepService;

  const stepRepoMock = new FakeStepRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStepService,
        {
          provide: IStepRepositorySymbol,
          useValue: stepRepoMock,
        },
      ],
    }).compile();

    service = module.get<UpdateStepService>(UpdateStepService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a step successfully', async () => {
    const step = fakeStep();

    stepRepoMock.findById.mockResolvedValueOnce(step);
    stepRepoMock.update.mockResolvedValueOnce(step.id.toValue());

    const result = await service.execute({
      id: step.id.toValue(),
      name: faker.person.fullName(),
    });

    expect(result).toBe(step.id.toValue());
    expect(stepRepoMock.update).toHaveBeenCalled();
  });

  it('should throw a not found error if step does not exist', async () => {
    await expect(
      service.execute({
        id: faker.string.uuid(),
      }),
    ).rejects.toThrow(UpdateStepErrors.NotFoundError);
  });

  it('should throw a conflict error if new name is already in use', async () => {
    const existingStep = fakeStep();
    const conflictingStep = fakeStep();
    const existingName = faker.person.fullName();

    stepRepoMock.findById.mockResolvedValueOnce(existingStep);
    stepRepoMock.findByIdentifier.mockResolvedValueOnce(conflictingStep);

    await expect(
      service.execute({
        id: existingStep.id.toValue(),
        name: existingName,
      }),
    ).rejects.toThrow(UpdateStepErrors.NameAlreadyInUse);

    expect(stepRepoMock.findByIdentifier).toHaveBeenCalledWith(existingName, existingStep.boardId);
    expect(stepRepoMock.update).not.toHaveBeenCalled();
  });
});
