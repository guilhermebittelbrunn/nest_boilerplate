import { Module } from '@nestjs/common';

import { UpdateBoardController } from './updateBoard.controller';
import { UpdateBoardService } from './updateBoard.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { BoardRepository } from '@/module/task/repositories/implementations/board.repository';

@Module({
  controllers: [UpdateBoardController],
  providers: [
    UpdateBoardService,
    {
      provide: IBoardRepositorySymbol,
      useClass: BoardRepository,
    },
  ],
})
export class UpdateBoardModule {}
