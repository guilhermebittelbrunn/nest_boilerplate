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

      const response = await request()
        .post(`/v1/board`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.CREATED);

      const createdBoard = await prisma.boardModel.findUnique({
        where: {
          id: response.body.data.id,
        },
      });

      expect(response.body.data.id).toBe(createdBoard.id);
      expect(response.body.data.name).toBe(payload.name);
      expect(response.body.data.ownerId).toBe(authInfos.userId);
    });

    it('should return an error when payload is not valid', async () => {
      const payload = {
        name: null,
      };

      const response = await request()
        .post(`/v1/board`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toContain('nome informado deve ser um texto válido');
    });
  });
});
