import { Inject, Injectable } from '@nestjs/common';

import { UpdateBoardDTO } from './dto/updateBoard.dto';
import UpdateBoardErrors from './updateBoard.error';

import Board from '@/module/task/domain/board';
import {
  IBoardRepository,
  IBoardRepositorySymbol,
} from '@/module/task/repositories/board.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { coalesce, isEmpty } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateBoardService {
  constructor(@Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository) {}

  async execute(dto: UpdateBoardDTO) {
    const currentBoard = await this.boardRepo.findById(dto.id);

    if (!currentBoard) {
      throw new UpdateBoardErrors.NotFoundError();
    }

    if (!isEmpty(dto.name)) {
      const boardWithSameName = await this.boardRepo.findByIdentifier(dto.name, currentBoard.ownerId);

      if (boardWithSameName) {
        throw new UpdateBoardErrors.NameAlreadyInUse(dto.name);
      }
    }

    const board = Board.create(
      {
        ownerId: currentBoard.ownerId,
        name: coalesce(dto.name, currentBoard.name),
      },
      new UniqueEntityID(dto.id),
    );

    return this.boardRepo.update(board);
  }
}
