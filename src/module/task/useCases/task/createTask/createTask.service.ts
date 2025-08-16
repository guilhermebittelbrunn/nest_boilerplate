import { Inject, Injectable } from '@nestjs/common';

import CreateTaskErrors from './createTask.error';
import { CreateTaskDTO } from './dto/createTask.dto';

import Task from '@/module/task/domain/task/task';
import TaskPriority from '@/module/task/domain/task/taskPriority';
import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { ITaskRepository, ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { IUserRepository, IUserRepositorySymbol } from '@/module/user/repositories/user.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { filledArray, isEmpty } from '@/shared/core/utils/undefinedHelpers';

const MAX_ALLOWED_TASKS_PER_STEP = 200;

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository,
    @Inject(ITaskRepositorySymbol) private readonly taskRepo: ITaskRepository,
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
  ) {}

  async execute(dto: CreateTaskDTO) {
    const step = await this.stepRepo.findCompleteById(dto.stepId);

    if (!step) {
      throw new CreateTaskErrors.StepNotFound();
    }

    if (filledArray(step.tasks.items) && step.tasks.items?.length >= MAX_ALLOWED_TASKS_PER_STEP) {
      throw new CreateTaskErrors.MaxTasksReached(step.name, MAX_ALLOWED_TASKS_PER_STEP);
    }

    if (!isEmpty(dto.assigneeId)) {
      const assignee = await this.userRepo.findById(dto.assigneeId);

      if (!assignee) {
        throw new CreateTaskErrors.AssigneeNotFound();
      }
    }

    const task = Task.create({
      title: dto.title,
      stepId: UniqueEntityID.create(dto.stepId),
      description: dto.description,
      assigneeId: UniqueEntityID.createOrUndefined(dto.assigneeId),
      dueDate: dto.dueDate,
      ...(dto.priority && { priority: TaskPriority.create(dto.priority) }),
    });

    return this.taskRepo.create(task);
  }
}
