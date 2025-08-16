import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import { DeleteBoardService } from './deleteBoard.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { fakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { FakeBoardRepository } from '@/module/task/repositories/tests/repositories/fakeBoard.repository';
import GenericErrors from '@/shared/core/logic/genericErrors';

describe('DeleteBoardService', () => {
  let service: DeleteBoardService;

  const boardRepoMock = new FakeBoardRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteBoardService,
        {
          provide: IBoardRepositorySymbol,
          useValue: boardRepoMock,
        },
      ],
    }).compile();

    service = module.get<DeleteBoardService>(DeleteBoardService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a board successfully', async () => {
    const board = fakeBoard();

    boardRepoMock.delete.mockResolvedValueOnce(true);

    const result = await service.execute(board.id.toValue());

    expect(result).toBeUndefined();
    expect(boardRepoMock.delete).toHaveBeenCalled();
  });

  it('should throw a not found error if board does not exist', async () => {
    boardRepoMock.delete.mockResolvedValueOnce(false);

    await expect(service.execute(faker.string.uuid())).rejects.toThrow(GenericErrors.NotFound);
  });
});
