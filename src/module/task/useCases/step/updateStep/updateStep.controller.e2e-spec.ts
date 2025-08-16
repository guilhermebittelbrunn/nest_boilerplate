import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { insertFakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('UpdateStepController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('PUT /v1/step/:id', () => {
    it('should update a step successfully', async () => {
      const step = await insertFakeStep();

      const newName = faker.person.fullName();

      const response = await request()
        .put(`/v1/step/${step.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send({
          name: newName,
        })
        .expect(HttpStatus.OK);

      const updatedStep = await prisma.stepModel.findUnique({
        where: {
          id: step.id,
        },
      });

      expect(response.body.data.id).toBe(step.id);
      expect(updatedStep.name).toBe(newName);
    });
  });
});
