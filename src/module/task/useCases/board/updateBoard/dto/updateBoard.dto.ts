import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { BoardDTO } from '@/module/task/dto/board.dto';

export class UpdateBoardDTO extends PartialType(BoardDTO) {
  @ApiHideProperty()
  id: string;
}
