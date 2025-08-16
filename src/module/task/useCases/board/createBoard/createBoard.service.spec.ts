import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import CreateBoardErrors from './createBoard.error';
import { CreateBoardService } from './createBoard.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { fakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { FakeBoardRepository } from '@/module/task/repositories/tests/repositories/fakeBoard.repository';
import { fakeUser } from '@/module/user/repositories/tests/entities/fakeUser';

describe('CreateBoardService', () => {
  let service: CreateBoardService;

  const boardRepoMock = new FakeBoardRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBoardService,
        {
          provide: IBoardRepositorySymbol,
          useValue: boardRepoMock,
        },
      ],
    }).compile();

    service = module.get<CreateBoardService>(CreateBoardService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a board successfully', async () => {
    const user = fakeUser();
    const board = fakeBoard();

    boardRepoMock.findByIdentifier.mockResolvedValueOnce(null);
    boardRepoMock.create.mockResolvedValueOnce(board);

    const result = await service.execute({
      ownerId: user.id.toValue(),
      name: board.name,
    });

    expect(result).toBe(board);
    expect(boardRepoMock.findByIdentifier).toHaveBeenCalledWith(board.name, user.id.toValue());
  });

  it('should throw a conflict error if board with same name already exists', async () => {
    boardRepoMock.findByIdentifier.mockResolvedValueOnce(fakeBoard());

    await expect(
      service.execute({
        ownerId: faker.string.uuid(),
        name: faker.person.fullName(),
      }),
    ).rejects.toThrow(CreateBoardErrors.BoardAlreadyExists);
  });
});
