import { Module } from '@nestjs/common';

import { CreateBoardController } from './createBoard.controller';
import { CreateBoardService } from './createBoard.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { BoardRepository } from '@/module/task/repositories/implementations/board.repository';

@Module({
  controllers: [CreateBoardController],
  providers: [
    CreateBoardService,
    {
      provide: IBoardRepositorySymbol,
      useClass: BoardRepository,
    },
  ],
})
export class CreateBoardModule {}
