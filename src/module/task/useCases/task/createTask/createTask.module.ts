import { Module } from '@nestjs/common';

import { CreateTaskController } from './createTask.controller';
import { CreateTaskService } from './createTask.service';

import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { TaskRepository } from '@/module/task/repositories/implementations/task.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { UserRepository } from '@/module/user/repositories/implementations/user.repository';
import { IUserRepositorySymbol } from '@/module/user/repositories/user.repository.interface';

@Module({
  controllers: [CreateTaskController],
  providers: [
    CreateTaskService,
    {
      provide: ITaskRepositorySymbol,
      useClass: TaskRepository,
    },
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class CreateTaskModule {}
