import { ApiHideProperty } from '@nestjs/swagger';

import { ValidatedString } from '@/shared/decorators';

export class CreateBoardDTO {
  @ValidatedString('nome')
  name: string;

  @ApiHideProperty()
  ownerId: string;
}
