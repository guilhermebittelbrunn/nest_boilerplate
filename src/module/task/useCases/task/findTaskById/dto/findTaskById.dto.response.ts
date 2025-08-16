import { ApiProperty } from '@nestjs/swagger';

import { TaskDTO } from '@/module/task/dto/task.dto';
import { UserDTO } from '@/module/user/dto/user.dto';

export class FindTaskByIdResponseDTO extends TaskDTO {
  @ApiProperty()
  assignee?: UserDTO;
}
