import { ValidatedString, ValidatedUUID } from '@/shared/decorators';

export class CreateStepDTO {
  @ValidatedString('nome')
  name: string;

  @ValidatedUUID('quadro')
  boardId: string;
}
