import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { BoardModel } from '@prisma/client';

import Board from '@/module/task/domain/board';
import { insertFakeUser } from '@/module/user/repositories/tests/entities/fakeUser';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export function fakeBoard(overrides?: Partial<BoardModel>): Board {
  return Board.create(
    {
      name: faker.person.fullName(),
      ...overrides,
      ownerId: UniqueEntityID.create(overrides?.ownerId ?? faker.string.uuid()),
    },
    UniqueEntityID.create(),
  );
}

export async function insertFakeBoard(overrides: Partial<BoardModel> = {}): Promise<BoardModel> {
  const board = fakeBoard(overrides);

  if (!overrides.ownerId) {
    const user = await insertFakeUser();
    overrides.ownerId = user.id;
  }

  return prisma.boardModel.create({
    data: {
      id: board.id.toValue(),
      name: board.name,
      ownerId: overrides.ownerId ?? board.ownerId.toValue(),
      ...overrides,
    },
  });
}
