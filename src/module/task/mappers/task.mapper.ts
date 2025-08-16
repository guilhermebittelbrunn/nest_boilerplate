import { TaskModel } from '@prisma/client';

import Task from '../domain/task/task';
import TaskPriority from '../domain/task/taskPriority';
import { TaskDTO } from '../dto/task.dto';

import UserMapper, { UserModelWithRelations } from '@/module/user/mappers/user.mapper';
import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { TaskPriorityEnum } from '@/shared/types/task/task';

export interface TaskModelWithRelations extends TaskModel {
  assignee?: UserModelWithRelations;
}

class BaseTaskMapper extends Mapper<Task, TaskModelWithRelations, TaskDTO> {
  toDomain(task: TaskModelWithRelations): Task {
    const priority = task.priority ? TaskPriority.create(task.priority as TaskPriorityEnum) : undefined;

    return Task.create(
      {
        title: task.title,
        stepId: new UniqueEntityID(task.stepId),
        description: task.description,
        assigneeId: UniqueEntityID.createOrUndefined(task.assigneeId),
        dueDate: task.dueDate,
        priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        deletedAt: task.deletedAt,
        assignee: UserMapper.toDomainOrUndefined(task.assignee),
      },
      new UniqueEntityID(task.id),
    );
  }

  async toPersistence(task: Task): Promise<TaskModel> {
    return {
      id: task.id.toValue(),
      title: task.title,
      stepId: task.stepId.toValue(),
      description: task.description,
      assigneeId: task.assigneeId?.toValue(),
      dueDate: task.dueDate,
      priority: task.priority?.value,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    };
  }

  toDTO(task: Task): TaskDTO {
    return {
      id: task.id.toValue(),
      title: task.title,
      stepId: task.stepId.toValue(),
      description: task.description,
      assigneeId: task.assigneeId?.toValue(),
      dueDate: task.dueDate,
      priority: task.priority?.value,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
      assignee: UserMapper.toDTOOrUndefined(task.assignee),
    };
  }
}

const TaskMapper = new BaseTaskMapper();

export default TaskMapper;
