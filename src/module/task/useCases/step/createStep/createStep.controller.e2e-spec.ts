import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { insertFakeBoard } from '@/module/task/repositories/tests/entities/fakeBoard';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('CreateStepController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('POST /v1/step', () => {
    it('should create a step successfully', async () => {
      const board = await insertFakeBoard({ ownerId: authInfos.userId });

      const payload = {
        name: faker.person.fullName(),
        boardId: board.id,
      };

      const response = await request()
        .post(`/v1/step`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.CREATED);

      const createdStep = await prisma.stepModel.findUnique({
        where: {
          id: response.body.data.id,
        },
      });

      expect(response.body.data.id).toBe(createdStep.id);
      expect(response.body.data.name).toBe(payload.name);
      expect(response.body.data.boardId).toBe(payload.boardId);
    });

    it('should return an error when payload is not valid', async () => {
      const payload = {
        name: null,
        boardId: null,
      };

      const response = await request()
        .post(`/v1/step`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toContain('nome informado deve ser um texto válido');
    });
  });
});
