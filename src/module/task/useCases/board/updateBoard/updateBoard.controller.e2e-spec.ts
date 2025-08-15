import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { insertFakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('UpdateBoardController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('PUT /v1/board/:id', () => {
    it('should update a board successfully', async () => {
      const board = await insertFakeBoard();
      const newName = faker.person.fullName();

      const result = await request()
        .put(`/v1/board/${board.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send({
          name: newName,
        })
        .expect(HttpStatus.OK);

      const updatedBoard = await prisma.boardModel.findUnique({
        where: {
          id: board.id,
        },
      });

      expect(result.body.data.id).toBe(board.id);
      expect(updatedBoard.name).toBe(newName);
    });
  });
});
