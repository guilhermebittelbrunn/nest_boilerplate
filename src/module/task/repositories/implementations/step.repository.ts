import { Injectable } from '@nestjs/common';
import { Prisma, StepModel } from '@prisma/client';

import Step from '../../domain/step';
import StepMapper from '../../mappers/step.mapper';
import { IStepRepository, ListStepByQuery } from '../step.repository.interface';

import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { PaginatedResult } from '@/shared/core/infra/pagination.interface';
import { BaseRepository } from '@/shared/core/infra/prisma/base.repository';
import { isEmpty } from '@/shared/core/utils/undefinedHelpers';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Als } from '@/shared/services/als/als.interface';
import { GenericId } from '@/shared/types/common';

@Injectable()
export class StepRepository extends BaseRepository<'stepModel', Step, StepModel> implements IStepRepository {
  mapper = StepMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('boardModel', prisma, als);
  }

  async findByIdentifier(identifier: string, boardId?: GenericId): Promise<Step | null> {
    const step = await this.prisma.stepModel.findFirst({
      where: {
        name: identifier,
        ...(!isEmpty(boardId) && { boardId: UniqueEntityID.raw(boardId) }),
      },
    });

    return this.mapper.toDomainOrNull(step);
  }

  async list(query?: ListStepByQuery): Promise<PaginatedResult<Step>> {
    const { page, take, skip } = this.getPaginationParams(query);

    const where: Prisma.StepModelWhereInput = {
      boardId: UniqueEntityID.raw(query.boardId),
    };

    const [steps, total] = await Promise.all([
      await this.manager().findMany({ skip, take, where }),
      await this.manager().count({ where }),
    ]);

    return {
      data: steps.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, take),
    };
  }
}
