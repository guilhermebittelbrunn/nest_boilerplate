import { IsOptional } from 'class-validator';

import { ValidatedDate, ValidatedEnum, ValidatedString, ValidatedUUID } from '@/shared/decorators';
import { TaskPriorityEnum } from '@/shared/types/task/task';

export class CreateTaskDTO {
  @ValidatedUUID('etapa')
  stepId: string;

  @ValidatedString('nome')
  title: string;

  @IsOptional()
  @ValidatedString('descrição')
  description?: string;

  @IsOptional()
  @ValidatedUUID('responsável')
  assigneeId?: string;

  @IsOptional()
  @ValidatedDate('data de vencimento')
  dueDate?: Date;

  @IsOptional()
  @ValidatedEnum('prioridade', TaskPriorityEnum)
  priority?: TaskPriorityEnum;
}
