import { Module } from '@nestjs/common';

import { DeleteStepController } from './deleteStep.controller';
import { DeleteStepService } from './deleteStep.service';

import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';

@Module({
  controllers: [DeleteStepController],
  providers: [
    DeleteStepService,
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
  ],
})
export class DeleteStepModule {}
