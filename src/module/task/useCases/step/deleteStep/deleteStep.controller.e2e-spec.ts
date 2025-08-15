import { prisma } from '@database/index';
import { faker } from '@faker-js/faker/.';
import { HttpStatus } from '@nestjs/common';

import { insertFakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('DeleteStepController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('DELETE /v1/step/:id', () => {
    it('should delete a step successfully', async () => {
      const step = await insertFakeStep();

      await request()
        .delete(`/v1/step/${step.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .expect(HttpStatus.NO_CONTENT);

      const deletedStep = await prisma.stepModel.findFirst({
        where: {
          id: step.id,
        },
      });

      expect(deletedStep).toBeNull();
    });

    it('should return 404 when step does not exist', async () => {
      const response = await request()
        .delete(`/v1/step/${faker.string.uuid()}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toBe('Etapa não encontrada');
    });
  });
});
