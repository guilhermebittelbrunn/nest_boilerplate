import { Module } from '@nestjs/common';

import { UpdateTaskController } from './updateTask.controller';
import { UpdateTaskService } from './updateTask.service';

import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { TaskRepository } from '@/module/task/repositories/implementations/task.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { UserRepository } from '@/module/user/repositories/implementations/user.repository';
import { IUserRepositorySymbol } from '@/module/user/repositories/user.repository.interface';

@Module({
  controllers: [UpdateTaskController],
  providers: [
    UpdateTaskService,
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
    {
      provide: ITaskRepositorySymbol,
      useClass: TaskRepository,
    },
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class UpdateTaskModule {}
