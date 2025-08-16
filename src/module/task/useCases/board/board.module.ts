import { Module } from '@nestjs/common';

import { CreateBoardModule } from './createBoard/createBoard.module';
import { DeleteBoardModule } from './deleteBoard/deleteBoard.module';
import { FindBoardByIdModule } from './findBoardById/findBoardById.module';
import { ListBoardsModule } from './listBoards/listBoards.module';
import { UpdateBoardModule } from './updateBoard/updateBoard.module';

@Module({
  imports: [FindBoardByIdModule, DeleteBoardModule, ListBoardsModule, UpdateBoardModule, CreateBoardModule],
})
export class BoardModule {}
