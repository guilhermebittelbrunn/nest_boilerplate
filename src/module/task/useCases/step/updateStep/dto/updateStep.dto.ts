import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { StepDTO } from '@/module/task/dto/step.dto';

export class UpdateStepDTO extends PartialType(StepDTO) {
  @ApiHideProperty()
  id: string;
}
