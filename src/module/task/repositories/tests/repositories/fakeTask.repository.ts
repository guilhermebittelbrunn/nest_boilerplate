import { ITaskRepository } from '../../task.repository.interface';

import Task from '@/module/task/domain/task/task';
import { FakeBaseRepository } from '@/shared/test/fakeBase.repository';

export class FakeTaskRepository extends FakeBaseRepository<Task> implements ITaskRepository {
  findCompleteById = jest.fn();
}
