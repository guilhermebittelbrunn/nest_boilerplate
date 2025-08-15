import { Module } from '@nestjs/common';

import { DeleteBoardController } from './deleteBoard.controller';
import { DeleteBoardService } from './deleteBoard.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { BoardRepository } from '@/module/task/repositories/implementations/board.repository';

@Module({
  controllers: [DeleteBoardController],
  providers: [
    DeleteBoardService,
    {
      provide: IBoardRepositorySymbol,
      useClass: BoardRepository,
    },
  ],
})
export class DeleteBoardModule {}
