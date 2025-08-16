import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { insertFakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('CreateTaskController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('POST /v1/task', () => {
    it('should create a task successfully', async () => {
      const step = await insertFakeStep();

      const payload = {
        title: faker.person.fullName(),
        stepId: step.id,
      };

      const result = await request()
        .post(`/v1/task`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.CREATED);

      const createdTask = await prisma.taskModel.findUnique({
        where: {
          id: result.body.data.id,
        },
      });

      expect(result.body.data.id).toBe(createdTask.id);
      expect(result.body.data.title).toBe(payload.title);
      expect(result.body.data.stepId).toBe(payload.stepId);
    });

    it('should return an error when payload is not valid', async () => {
      const payload = {
        title: '',
        stepId: null,
      };

      await request()
        .post(`/v1/task`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
