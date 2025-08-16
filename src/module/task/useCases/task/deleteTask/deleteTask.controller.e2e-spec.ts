import { prisma } from '@database/index';
import { faker } from '@faker-js/faker/.';
import { HttpStatus } from '@nestjs/common';

import { insertFakeTask } from '@/module/task/repositories/tests/entities/fakeTask';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('DeleteTaskController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('DELETE /v1/task/:id', () => {
    it('should delete a task successfully', async () => {
      const task = await insertFakeTask();

      await request()
        .delete(`/v1/task/${task.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .expect(HttpStatus.NO_CONTENT);

      const deletedTask = await prisma.taskModel.findFirst({
        where: {
          id: task.id,
        },
      });

      expect(deletedTask).toBeNull();
    });

    it('should return 404 when step does not exist', async () => {
      const response = await request()
        .delete(`/v1/task/${faker.string.uuid()}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toBe('Tarefa não encontrada');
    });
  });
});
