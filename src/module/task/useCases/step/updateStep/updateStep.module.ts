import { Module } from '@nestjs/common';

import { UpdateStepController } from './updateStep.controller';
import { UpdateStepService } from './updateStep.service';

import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';

@Module({
  controllers: [UpdateStepController],
  providers: [
    UpdateStepService,
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
  ],
})
export class UpdateStepModule {}
