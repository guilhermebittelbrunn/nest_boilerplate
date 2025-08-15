import Step from '../domain/step';

import { PaginatedResult, PaginationQuery } from '@/shared/core/infra/pagination.interface';
import { IBaseRepository, SingleEntityResponse } from '@/shared/core/infra/repository.interface';
import { GenericId } from '@/shared/types/common';

export interface ListStepByQuery extends PaginationQuery {
  boardId: GenericId;
}

export interface IStepRepository extends IBaseRepository<Step> {
  findByIdentifier(identifier: string, boardId?: GenericId): SingleEntityResponse<Step>;
  list(dto: ListStepByQuery): Promise<PaginatedResult<Step>>;
}

export const IStepRepositorySymbol = Symbol('IStepRepository');
