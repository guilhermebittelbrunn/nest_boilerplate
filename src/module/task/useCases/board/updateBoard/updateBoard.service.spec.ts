import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import UpdateBoardErrors from './updateBoard.error';
import { UpdateBoardService } from './updateBoard.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { fakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { FakeBoardRepository } from '@/module/task/repositories/tests/repositories/fakeBoard.repository';

describe('UpdateBoardService', () => {
  let service: UpdateBoardService;

  const boardRepoMock = new FakeBoardRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBoardService,
        {
          provide: IBoardRepositorySymbol,
          useValue: boardRepoMock,
        },
      ],
    }).compile();

    service = module.get<UpdateBoardService>(UpdateBoardService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a board successfully', async () => {
    const board = fakeBoard();

    boardRepoMock.findById.mockResolvedValueOnce(board);
    boardRepoMock.update.mockResolvedValueOnce(board.id.toValue());

    const result = await service.execute({
      id: board.id.toValue(),
      name: faker.person.fullName(),
    });

    expect(result).toBe(board.id.toValue());
    expect(boardRepoMock.update).toHaveBeenCalled();
  });

  it('should throw a not found error if board does not exist', async () => {
    await expect(
      service.execute({
        id: faker.string.uuid(),
      }),
    ).rejects.toThrow(UpdateBoardErrors.NotFoundError);
  });

  it('should throw a conflict error if new name is already in use', async () => {
    const existingBoard = fakeBoard();
    const conflictingBoard = fakeBoard();
    const existingName = faker.person.fullName();

    boardRepoMock.findById.mockResolvedValueOnce(existingBoard);
    boardRepoMock.findByIdentifier.mockResolvedValueOnce(conflictingBoard);

    await expect(
      service.execute({
        id: existingBoard.id.toValue(),
        name: existingName,
      }),
    ).rejects.toThrow(UpdateBoardErrors.NameAlreadyInUse);

    expect(boardRepoMock.findByIdentifier).toHaveBeenCalledWith(existingName, existingBoard.ownerId);
    expect(boardRepoMock.update).not.toHaveBeenCalled();
  });
});
