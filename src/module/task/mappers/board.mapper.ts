import { BoardModel } from '@prisma/client';

import StepMapper, { StepModelWithRelations } from './step.mapper';

import Board from '../domain/board';
import { BoardDTO } from '../dto/board.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface BoardModelWithRelations extends BoardModel {
  steps?: StepModelWithRelations[];
}

class BaseBoardMapper extends Mapper<Board, BoardModelWithRelations, BoardDTO> {
  toDomain(board: BoardModelWithRelations): Board {
    return Board.create(
      {
        name: board.name,
        ownerId: new UniqueEntityID(board.ownerId),
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
        deletedAt: board.deletedAt,
        steps: board.steps?.map(StepMapper.toDomain),
      },
      new UniqueEntityID(board.id),
    );
  }

  async toPersistence(board: Board): Promise<BoardModel> {
    return {
      id: board.id.toValue(),
      name: board.name,
      ownerId: board.ownerId.toValue(),
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      deletedAt: board.deletedAt,
    };
  }

  toDTO(board: Board): BoardDTO {
    return {
      id: board.id.toValue(),
      name: board.name,
      ownerId: board.ownerId.toValue(),
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      deletedAt: board.deletedAt,
    };
  }
}

const BoardMapper = new BaseBoardMapper();

export default BoardMapper;
