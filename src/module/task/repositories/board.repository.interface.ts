import Board from '../domain/board';

import { PaginatedResult, PaginationQuery } from '@/shared/core/infra/pagination.interface';
import { IBaseRepository, SingleEntityResponse } from '@/shared/core/infra/repository.interface';
import { GenericId } from '@/shared/types/common';

export interface ListBoardByQuery extends PaginationQuery {
  userId: GenericId;
}

export interface IBoardRepository extends IBaseRepository<Board> {
  findCompleteById(id: GenericId): SingleEntityResponse<Board>;
  findByIdentifier(identifier: string, userId?: GenericId): SingleEntityResponse<Board>;
  list(dto: ListBoardByQuery): Promise<PaginatedResult<Board>>;
}

export const IBoardRepositorySymbol = Symbol('IBoardRepository');
