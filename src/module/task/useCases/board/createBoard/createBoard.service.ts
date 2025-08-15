import { Inject, Injectable } from '@nestjs/common';

import CreateBoardErrors from './createBoard.error';
import { CreateBoardDTO } from './dto/createBoard.dto';

import Board from '@/module/task/domain/board';
import {
  IBoardRepository,
  IBoardRepositorySymbol,
} from '@/module/task/repositories/board.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

@Injectable()
export class CreateBoardService {
  constructor(@Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository) {}

  async execute({ ownerId, name }: CreateBoardDTO) {
    const boardWithSameName = await this.boardRepo.findByIdentifier(name, ownerId);

    if (boardWithSameName) {
      throw new CreateBoardErrors.BoardAlreadyExists(name);
    }

    const board = Board.create({
      name,
      ownerId: UniqueEntityID.create(ownerId),
    });

    return this.boardRepo.create(board);
  }
}
