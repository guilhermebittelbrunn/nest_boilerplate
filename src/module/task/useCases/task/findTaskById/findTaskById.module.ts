import { Module } from '@nestjs/common';

import { FindTaskByIdController } from './findTaskById.controller';
import { FindTaskByIdService } from './findTaskById.service';

import { TaskRepository } from '@/module/task/repositories/implementations/task.repository';
import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';

@Module({
  controllers: [FindTaskByIdController],
  providers: [
    FindTaskByIdService,
    {
      provide: ITaskRepositorySymbol,
      useClass: TaskRepository,
    },
  ],
})
export class FindTaskByIdModule {}
