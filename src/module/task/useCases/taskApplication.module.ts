import { Module } from '@nestjs/common';

import { BoardModule } from './board/board.module';
import { StepModule } from './step/step.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [BoardModule, StepModule, TaskModule],
})
export class TaskApplicationModule {}
