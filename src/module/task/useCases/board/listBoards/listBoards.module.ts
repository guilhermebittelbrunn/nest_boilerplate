import { Module } from '@nestjs/common';

import { ListBoardsController } from './listBoards.controller';
import { ListBoardsService } from './listBoards.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { BoardRepository } from '@/module/task/repositories/implementations/board.repository';

@Module({
  controllers: [ListBoardsController],
  providers: [
    ListBoardsService,
    {
      provide: IBoardRepositorySymbol,
      useClass: BoardRepository,
    },
  ],
})
export class ListBoardsModule {}
