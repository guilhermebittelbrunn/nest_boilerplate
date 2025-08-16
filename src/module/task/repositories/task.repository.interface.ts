import Task from '../domain/task/task';

import { IBaseRepository, SingleEntityResponse } from '@/shared/core/infra/repository.interface';
import { GenericId } from '@/shared/types/common';

export interface ITaskRepository extends IBaseRepository<Task> {
  findCompleteById(id: GenericId): SingleEntityResponse<Task>;
}

export const ITaskRepositorySymbol = Symbol('ITaskRepository');
