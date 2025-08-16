import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { StepModel } from '@prisma/client';

import Step from '@/module/task/domain/step';
import { insertFakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export function fakeStep(overrides?: Partial<StepModel>): Step {
  return Step.create(
    {
      name: faker.person.fullName(),
      ...overrides,
      boardId: UniqueEntityID.create(overrides?.boardId ?? faker.string.uuid()),
    },
    UniqueEntityID.create(),
  );
}

export async function insertFakeStep(overrides: Partial<StepModel> = {}): Promise<StepModel> {
  const step = fakeStep(overrides);

  if (!overrides.boardId) {
    const board = await insertFakeBoard();
    overrides.boardId = board.id;
  }

  return prisma.stepModel.create({
    data: {
      id: step.id.toValue(),
      name: step.name,
      boardId: step.boardId.toValue(),
      ...overrides,
    },
  });
}
