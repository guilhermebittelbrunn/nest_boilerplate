import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('CreateBoardController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('POST /v1/board', () => {
    it('should create a board successfully', async () => {
      const payload = {
        name: faker.person.fullName(),
      };

      const result = await request()
        .post(`/v1/board`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.OK);

      const createdBoard = await prisma.boardModel.findUnique({
        where: {
          id: result.body.data.id,
        },
      });

      expect(result.body.data.id).toBe(createdBoard.id);
      expect(result.body.data.name).toBe(payload.name);
      expect(result.body.data.ownerId).toBe(authInfos.userId);
    });

    it('should return an error when payload is not valid', async () => {
      const payload = {
        name: '',
      };

      await request()
        .post(`/v1/board`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
