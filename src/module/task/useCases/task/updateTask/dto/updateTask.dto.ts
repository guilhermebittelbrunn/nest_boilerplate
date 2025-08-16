import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { CreateTaskDTO } from '../../createTask/dto/createTask.dto';

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @ApiHideProperty()
  id: string;
}
