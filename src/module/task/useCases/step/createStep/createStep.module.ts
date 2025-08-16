import { Module } from '@nestjs/common';

import { CreateStepController } from './createStep.controller';
import { CreateStepService } from './createStep.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { BoardRepository } from '@/module/task/repositories/implementations/board.repository';
import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';

@Module({
  controllers: [CreateStepController],
  providers: [
    CreateStepService,
    {
      provide: IBoardRepositorySymbol,
      useClass: BoardRepository,
    },
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
  ],
})
export class CreateStepModule {}
