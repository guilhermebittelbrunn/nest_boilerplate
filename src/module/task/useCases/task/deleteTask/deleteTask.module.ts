import { Module } from '@nestjs/common';

import { DeleteTaskController } from './deleteTask.controller';
import { DeleteTaskService } from './deleteTask.service';

import { TaskRepository } from '@/module/task/repositories/implementations/task.repository';
import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';

@Module({
  controllers: [DeleteTaskController],
  providers: [
    DeleteTaskService,
    {
      provide: ITaskRepositorySymbol,
      useClass: TaskRepository,
    },
  ],
})
export class DeleteTaskModule {}
