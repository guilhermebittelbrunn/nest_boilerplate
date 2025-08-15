import { Injectable } from '@nestjs/common';
import { BoardModel, Prisma } from '@prisma/client';

import Board from '../../domain/board';
import BoardMapper from '../../mappers/board.mapper';
import { IBoardRepository, ListBoardByQuery } from '../board.repository.interface';

import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { PaginatedResult } from '@/shared/core/infra/pagination.interface';
import { BaseRepository } from '@/shared/core/infra/prisma/base.repository';
import { isEmpty } from '@/shared/core/utils/undefinedHelpers';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Als } from '@/shared/services/als/als.interface';
import { GenericId } from '@/shared/types/common';

@Injectable()
export class BoardRepository
  extends BaseRepository<'boardModel', Board, BoardModel>
  implements IBoardRepository
{
  mapper = BoardMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('boardModel', prisma, als);
  }

  async findByIdentifier(identifier: string, userId?: GenericId): Promise<Board | null> {
    const board = await this.prisma.boardModel.findFirst({
      where: {
        name: identifier,
        ...(!isEmpty(userId) && { ownerId: UniqueEntityID.raw(userId) }),
      },
    });

    return this.mapper.toDomainOrNull(board);
  }

  async list(query?: ListBoardByQuery): Promise<PaginatedResult<Board>> {
    const { page, take, skip } = this.getPaginationParams(query);

    const where: Prisma.BoardModelWhereInput = {
      ownerId: UniqueEntityID.raw(query.userId),
    };

    const [boards, total] = await Promise.all([
      await this.manager().findMany({ skip, take, where }),
      await this.manager().count({ where }),
    ]);

    return {
      data: boards.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, take),
    };
  }
}
