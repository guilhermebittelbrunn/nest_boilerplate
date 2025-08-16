import { prisma } from '@database/index';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { insertFakeTask } from '@/module/task/repositories/tests/entities/fakeTask';
import { IAuthenticatedUserData } from '@/shared/test/helpers/getAuthenticatedUser';
import getAuthenticatedUser from '@/shared/test/helpers/getAuthenticatedUser';
import { request } from '@/shared/test/utils';

describe('UpdateTaskController (e2e)', () => {
  let authInfos: IAuthenticatedUserData;

  beforeAll(async () => {
    authInfos = await getAuthenticatedUser();
  });

  describe('PUT /v1/task/:id', () => {
    it('should update a task successfully', async () => {
      const task = await insertFakeTask();
      const newTitle = faker.person.fullName();

      const result = await request()
        .put(`/v1/task/${task.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send({
          title: newTitle,
        })
        .expect(HttpStatus.OK);

      const updatedTask = await prisma.taskModel.findUnique({
        where: {
          id: task.id,
        },
      });

      expect(result.body.data.id).toBe(task.id);
      expect(updatedTask.title).toBe(newTitle);
    });

    it('should return an error when payload is not valid', async () => {
      const task = await insertFakeTask();

      const response = await request()
        .put(`/v1/task/${task.id}`)
        .set('authorization', `Bearer ${authInfos.access_token}`)
        .send({
          assigneeId: '123',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toContain('responsável informado não é válido');
    });
  });
});
