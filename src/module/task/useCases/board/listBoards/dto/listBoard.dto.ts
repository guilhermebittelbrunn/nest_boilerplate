import { ApiHideProperty } from '@nestjs/swagger';

import { GenericPaginationFilterQuery } from '@/shared/core/infra/pagination.interface';

export class ListBoardDTO extends GenericPaginationFilterQuery {
  @ApiHideProperty()
  userId: string;
}
