import { prisma } from '@database/index';
import { faker } from '@faker-js/faker/.';
import { HttpStatus } from '@nestjs/common';

import { insertFakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('DeleteBoardController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('DELETE /v1/board/:id', () => {
    it('should delete a board successfully', async () => {
      const board = await insertFakeBoard();

      await request()
        .delete(`/v1/board/${board.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .expect(HttpStatus.NO_CONTENT);

      const deletedBoard = await prisma.boardModel.findFirst({
        where: {
          id: board.id,
        },
      });

      expect(deletedBoard).toBeNull();
    });

    it('should return 404 when board does not exist', async () => {
      const response = await request()
        .delete(`/v1/board/${faker.string.uuid()}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toBe('Quadro não encontrado');
    });
  });
});
