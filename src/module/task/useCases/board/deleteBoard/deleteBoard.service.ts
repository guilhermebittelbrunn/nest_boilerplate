import { Inject, Injectable } from '@nestjs/common';

import {
  IBoardRepository,
  IBoardRepositorySymbol,
} from '@/module/task/repositories/board.repository.interface';
import GenericErrors from '@/shared/core/logic/genericErrors';

@Injectable()
export class DeleteBoardService {
  constructor(@Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository) {}

  async execute(id: string) {
    const deleted = await this.boardRepo.delete(id);

    if (!deleted) {
      throw new GenericErrors.NotFound(`Quadro não encontrado`);
    }
  }
}
