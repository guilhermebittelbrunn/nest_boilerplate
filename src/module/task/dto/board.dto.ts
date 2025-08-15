import { ApiProperty } from '@nestjs/swagger';

import { BaseEntityDTO } from '@/shared/core/dto/BaseEntityDTO';
import { ApiUUIDProperty } from '@/shared/infra/docs/swagger/decorators/apiUUIDProperty.decorator';

export class BoardDTO extends BaseEntityDTO {
  @ApiProperty()
  name: string;

  @ApiUUIDProperty()
  ownerId: string;
}
