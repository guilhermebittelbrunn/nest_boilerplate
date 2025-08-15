import { Module } from '@nestjs/common';

import { ListStepsController } from './listSteps.controller';
import { ListStepsService } from './listSteps.service';

import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';

@Module({
  controllers: [ListStepsController],
  providers: [
    ListStepsService,
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
  ],
})
export class ListStepsModule {}
