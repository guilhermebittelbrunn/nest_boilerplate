import { Module } from '@nestjs/common';

import { BoardModule } from './board/board.module';
import { StepModule } from './step/step.module';

@Module({
  imports: [BoardModule, StepModule],
})
export class TaskApplicationModule {}
