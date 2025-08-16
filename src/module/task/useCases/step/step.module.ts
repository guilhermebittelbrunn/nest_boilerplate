import { Module } from '@nestjs/common';

import { CreateStepModule } from './createStep/createStep.module';
import { DeleteStepModule } from './deleteStep/deleteStep.module';
import { FindStepByIdModule } from './findStepById/findStepById.module';
import { ListStepsModule } from './listSteps/listSteps.module';
import { UpdateStepModule } from './updateStep/updateStep.module';

@Module({
  imports: [FindStepByIdModule, DeleteStepModule, ListStepsModule, UpdateStepModule, CreateStepModule],
})
export class StepModule {}
