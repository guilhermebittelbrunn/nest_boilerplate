import { IBoardRepository } from '../../board.repository.interface';

import Board from '@/module/task/domain/board';
import { FakeBaseRepository } from '@/shared/test/fakeBase.repository';

export class FakeBoardRepository extends FakeBaseRepository<Board> implements IBoardRepository {
  findCompleteById = jest.fn();
  findByIdentifier = jest.fn();
  list = jest.fn();
}
