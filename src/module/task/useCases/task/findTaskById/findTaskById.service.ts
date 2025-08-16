import { Inject, Injectable } from '@nestjs/common';

import { ITaskRepository, ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import GenericErrors from '@/shared/core/logic/genericErrors';

@Injectable()
export class FindTaskByIdService {
  constructor(@Inject(ITaskRepositorySymbol) private readonly taskRepo: ITaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepo.findById(id);

    if (!task) {
      throw new GenericErrors.NotFound('Tarefa não encontrada');
    }

    return task;
  }
}
