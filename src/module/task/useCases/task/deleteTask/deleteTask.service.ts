import { Inject, Injectable } from '@nestjs/common';

import { ITaskRepository, ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import GenericErrors from '@/shared/core/logic/genericErrors';

@Injectable()
export class DeleteTaskService {
  constructor(@Inject(ITaskRepositorySymbol) private readonly taskRepo: ITaskRepository) {}

  async execute(id: string) {
    const deleted = await this.taskRepo.delete(id);

    if (!deleted) {
      throw new GenericErrors.NotFound(`Tarefa não encontrada`);
    }
  }
}
