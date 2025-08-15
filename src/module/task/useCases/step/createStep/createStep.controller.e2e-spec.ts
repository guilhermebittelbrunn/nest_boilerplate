import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

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
      const payload = {
        name: faker.person.fullName(),
        boardId: faker.string.uuid(),
      };

      const result = await request()
        .post(`/v1/step`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.OK);

      const createdStep = await prisma.stepModel.findUnique({
        where: {
          id: result.body.data.id,
        },
      });

      expect(result.body.data.id).toBe(createdStep.id);
      expect(result.body.data.name).toBe(payload.name);
      expect(result.body.data.boardId).toBe(payload.boardId);
    });

    it('should return an error when payload is not valid', async () => {
      const payload = {
        name: '',
        boardId: null,
      };

      await request()
        .post(`/v1/step`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
