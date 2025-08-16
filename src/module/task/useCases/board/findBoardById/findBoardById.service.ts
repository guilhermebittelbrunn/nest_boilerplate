import { Inject, Injectable } from '@nestjs/common';

import {
  IBoardRepository,
  IBoardRepositorySymbol,
} from '@/module/task/repositories/board.repository.interface';
import GenericErrors from '@/shared/core/logic/genericErrors';

@Injectable()
export class FindBoardByIdService {
  constructor(@Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository) {}

  async execute(id: string) {
    const board = await this.boardRepo.findById(id);

    if (!board) {
      throw new GenericErrors.NotFound('Quadro não encontrado');
    }

    return board;
  }
}
