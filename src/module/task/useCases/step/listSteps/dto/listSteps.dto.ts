import { GenericPaginationFilterQuery } from '@/shared/core/infra/pagination.interface';
import { ValidatedUUID } from '@/shared/decorators';

export class ListStepsDTO extends GenericPaginationFilterQuery {
  @ValidatedUUID('quadro')
  boardId: string;
}
