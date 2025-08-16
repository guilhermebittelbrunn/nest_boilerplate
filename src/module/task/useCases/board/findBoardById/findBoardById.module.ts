import { Module } from '@nestjs/common';

import { FindBoardByIdController } from './findBoardById.controller';
import { FindBoardByIdService } from './findBoardById.service';

import { IBoardRepositorySymbol } from '@/module/task/repositories/board.repository.interface';
import { BoardRepository } from '@/module/task/repositories/implementations/board.repository';

@Module({
  controllers: [FindBoardByIdController],
  providers: [
    FindBoardByIdService,
    {
      provide: IBoardRepositorySymbol,
      useClass: BoardRepository,
    },
  ],
})
export class FindBoardByIdModule {}
