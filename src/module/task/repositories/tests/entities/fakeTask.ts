import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { TaskModel } from '@prisma/client';

import { insertFakeStep } from './fakeStep';

import Task from '@/module/task/domain/task/task';
import TaskPriority from '@/module/task/domain/task/taskPriority';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { TaskPriorityEnum } from '@/shared/types/task/task';

export function fakeTask(overrides?: Partial<TaskModel>): Task {
  return Task.create(
    {
      title: faker.person.fullName(),
      description: faker.lorem.sentence(),
      dueDate: faker.date.future(),
      ...overrides,
      assigneeId: UniqueEntityID.create(overrides?.assigneeId ?? faker.string.uuid()),
      priority: TaskPriority.create((overrides?.priority as TaskPriorityEnum) ?? TaskPriorityEnum.LOW),
      stepId: new UniqueEntityID(overrides?.stepId ?? faker.string.uuid()),
    },
    UniqueEntityID.create(),
  );
}

export async function insertFakeTask(overrides: Partial<TaskModel> = {}): Promise<TaskModel> {
  const task = fakeTask(overrides);

  if (!overrides.stepId) {
    const step = await insertFakeStep();
    overrides.stepId = step.id;
  }

  return prisma.taskModel.create({
    data: {
      id: task.id.toValue(),
      title: task.title,
      stepId: overrides.stepId ?? task.stepId.toValue(),
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority?.value,
      ...overrides,
    },
  });
}
