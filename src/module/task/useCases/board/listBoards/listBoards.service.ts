import { Inject, Injectable } from '@nestjs/common';

import { ListBoardDTO } from './dto/listBoard.dto';

import {
  IBoardRepository,
  IBoardRepositorySymbol,
} from '@/module/task/repositories/board.repository.interface';

@Injectable()
export class ListBoardsService {
  constructor(@Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository) {}

  async execute(dto: ListBoardDTO) {
    return this.boardRepo.list(dto);
  }
}
