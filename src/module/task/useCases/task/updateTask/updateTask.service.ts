import { Inject, Injectable } from '@nestjs/common';

import { UpdateTaskDTO } from './dto/updateTask.dto';
import UpdateTaskErrors from './updateTask.error';

import Task from '@/module/task/domain/task/task';
import TaskPriority from '@/module/task/domain/task/taskPriority';
import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { ITaskRepository, ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { IUserRepository, IUserRepositorySymbol } from '@/module/user/repositories/user.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { coalesce, coalesceUndefined, isEmpty } from '@/shared/core/utils/undefinedHelpers';

const MAX_ALLOWED_TASKS_PER_STEP = 200;

@Injectable()
export class UpdateTaskService {
  constructor(
    @Inject(ITaskRepositorySymbol) private readonly taskRepo: ITaskRepository,
    @Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository,
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
  ) {}

  async execute(dto: UpdateTaskDTO) {
    const currentTask = await this.taskRepo.findById(dto.id);

    if (!currentTask) {
      throw new UpdateTaskErrors.TaskNotFound();
    }

    if (!isEmpty(dto.stepId) && !currentTask.stepId.equalsRaw(dto.stepId)) {
      const step = await this.stepRepo.findCompleteById(dto.stepId);

      if (!step) {
        throw new UpdateTaskErrors.StepNotFound();
      }

      if (step.tasks.items.length >= MAX_ALLOWED_TASKS_PER_STEP) {
        throw new UpdateTaskErrors.MaxTasksReached(step.name, MAX_ALLOWED_TASKS_PER_STEP);
      }
    }

    if (!isEmpty(dto.assigneeId) && !currentTask.assigneeId.equalsRaw(dto.assigneeId)) {
      const assignee = await this.userRepo.findById(dto.assigneeId);

      if (!assignee) {
        throw new UpdateTaskErrors.AssigneeNotFound();
      }
    }

    let priority = currentTask.priority;

    if (!isEmpty(dto.priority) && currentTask.priority.value !== dto.priority) {
      priority = TaskPriority.create(dto.priority);
    }

    const task = Task.create(
      {
        title: coalesce(dto.title, currentTask.title),
        description: coalesce(dto.description, currentTask.description),
        priority,
        stepId: coalesce(UniqueEntityID.createOrUndefined(dto.stepId), currentTask.stepId),
        assigneeId: coalesceUndefined(UniqueEntityID.createOrUndefined(dto.assigneeId), currentTask.assigneeId),
        dueDate: coalesce(dto.dueDate, currentTask.dueDate),
      },
      new UniqueEntityID(dto.id),
    );

    return this.taskRepo.update(task);
  }
}
