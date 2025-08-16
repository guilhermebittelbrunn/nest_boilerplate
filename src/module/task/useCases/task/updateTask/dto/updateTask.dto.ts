import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { TaskDTO } from '@/module/task/dto/task.dto';

export class UpdateTaskDTO extends PartialType(TaskDTO) {
  @ApiHideProperty()
  id: string;
}
