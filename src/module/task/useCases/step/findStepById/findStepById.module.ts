import { Module } from '@nestjs/common';

import { FindStepByIdController } from './findStepById.controller';
import { FindStepByIdService } from './findStepById.service';

import { StepRepository } from '@/module/task/repositories/implementations/step.repository';
import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';

@Module({
  controllers: [FindStepByIdController],
  providers: [
    FindStepByIdService,
    {
      provide: IStepRepositorySymbol,
      useClass: StepRepository,
    },
  ],
})
export class FindStepByIdModule {}
