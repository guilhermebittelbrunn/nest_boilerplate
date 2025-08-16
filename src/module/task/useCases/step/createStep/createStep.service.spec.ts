import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import CreateStepErrors from './createStep.error';
import { CreateStepService } from './createStep.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { fakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { fakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { FakeBoardRepository } from '@/module/task/repositories/tests/repositories/fakeBoard.repository';
import { FakeStepRepository } from '@/module/task/repositories/tests/repositories/fakeStep.repository';

describe('CreateStepService', () => {
  let service: CreateStepService;

  const boardRepoMock = new FakeBoardRepository();
  const stepRepoMock = new FakeStepRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStepService,
        {
          provide: IBoardRepositorySymbol,
          useValue: boardRepoMock,
        },
        {
          provide: IStepRepositorySymbol,
          useValue: stepRepoMock,
        },
      ],
    }).compile();

    service = module.get<CreateStepService>(CreateStepService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a step successfully', async () => {
    const board = fakeBoard();
    const step = fakeStep({ boardId: board.id.toValue() });

    stepRepoMock.findByIdentifier.mockResolvedValueOnce(null);
    boardRepoMock.findCompleteById.mockResolvedValueOnce(board);
    stepRepoMock.create.mockResolvedValueOnce(step);

    const result = await service.execute({
      boardId: step.boardId.toValue(),
      name: step.name,
    });

    expect(result).toBe(step);
    expect(boardRepoMock.findCompleteById).toHaveBeenCalledWith(step.boardId.toValue());
    expect(stepRepoMock.findByIdentifier).toHaveBeenCalledWith(step.name, step.boardId.toValue());
  });

  it('should throw a conflict error if step with same name already exists', async () => {
    const board = fakeBoard();
    const step = fakeStep({ boardId: board.id.toValue() });

    boardRepoMock.findCompleteById.mockResolvedValueOnce(board);
    stepRepoMock.findByIdentifier.mockResolvedValueOnce(step);

    await expect(
      service.execute({
        boardId: step.boardId.toValue(),
        name: step.name,
      }),
    ).rejects.toThrow(CreateStepErrors.StepAlreadyExists);

    expect(boardRepoMock.findCompleteById).toHaveBeenCalledWith(step.boardId.toValue());
    expect(stepRepoMock.findByIdentifier).toHaveBeenCalledWith(step.name, step.boardId.toValue());
  });

  it('should throw a not found error if board not found', async () => {
    boardRepoMock.findCompleteById.mockResolvedValueOnce(null);

    await expect(
      service.execute({
        boardId: faker.string.uuid(),
        name: faker.person.fullName(),
      }),
    ).rejects.toThrow(CreateStepErrors.BoardNotFound);
  });

  it('should throw a conflict error if max steps reached', async () => {
    const board = fakeBoard();
    const steps = Array.from({ length: 20 }, () => fakeStep({ boardId: board.id.toValue() }));

    board.steps = steps;

    boardRepoMock.findCompleteById.mockResolvedValueOnce(board);

    await expect(
      service.execute({
        boardId: board.id.toValue(),
        name: faker.person.fullName(),
      }),
    ).rejects.toThrow(CreateStepErrors.MaxStepsReached);

    expect(boardRepoMock.findCompleteById).toHaveBeenCalledWith(board.id.toValue());
  });
});
