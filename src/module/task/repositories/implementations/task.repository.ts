import { Injectable } from '@nestjs/common';
import { TaskModel } from '@prisma/client';

import Task from '../../domain/task/task';
import TaskMapper from '../../mappers/task.mapper';
import { ITaskRepository } from '../task.repository.interface';

import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { BaseRepository } from '@/shared/core/infra/prisma/base.repository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Als } from '@/shared/services/als/als.interface';
import { GenericId } from '@/shared/types/common';

@Injectable()
export class TaskRepository extends BaseRepository<'taskModel', Task, TaskModel> implements ITaskRepository {
  mapper = TaskMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('taskModel', prisma, als);
  }

  async findCompleteById(id: GenericId): Promise<Task | null> {
    const task = await this.prisma.taskModel.findUnique({
      where: { id: UniqueEntityID.raw(id) },
      include: {
        assignee: true,
      },
    });

    return this.mapper.toDomainOrNull(task);
  }
}
