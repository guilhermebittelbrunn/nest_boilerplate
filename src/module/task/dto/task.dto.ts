import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { UserDTO } from '@/module/user/dto/user.dto';
import { BaseEntityDTO } from '@/shared/core/dto/BaseEntityDTO';
import { ApiUUIDProperty } from '@/shared/infra/docs/swagger/decorators/apiUUIDProperty.decorator';
import { TaskPriorityEnum } from '@/shared/types/task/task';

export class TaskDTO extends BaseEntityDTO {
  @ApiProperty()
  title: string;

  @ApiUUIDProperty()
  stepId: string;

  @ApiProperty()
  description?: string;

  @ApiUUIDProperty()
  assigneeId?: string;

  @ApiProperty()
  dueDate?: Date;

  @ApiProperty()
  priority?: TaskPriorityEnum;

  @ApiHideProperty()
  assignee?: UserDTO;
}
