import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import { DeleteTaskService } from './deleteTask.service';

import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { fakeTask } from '@/module/task/repositories/tests/entities/fakeTask';
import { FakeTaskRepository } from '@/module/task/repositories/tests/repositories/fakeTask.repository';
import GenericErrors from '@/shared/core/logic/genericErrors';

describe('DeleteTaskService', () => {
  let service: DeleteTaskService;

  const taskRepoMock = new FakeTaskRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTaskService,
        {
          provide: ITaskRepositorySymbol,
          useValue: taskRepoMock,
        },
      ],
    }).compile();

    service = module.get<DeleteTaskService>(DeleteTaskService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a step successfully', async () => {
    const task = fakeTask();

    taskRepoMock.delete.mockResolvedValueOnce(true);

    const result = await service.execute(task.id.toValue());

    expect(result).toBeUndefined();
    expect(taskRepoMock.delete).toHaveBeenCalled();
  });

  it('should throw a not found error if step does not exist', async () => {
    taskRepoMock.delete.mockResolvedValueOnce(false);

    await expect(service.execute(faker.string.uuid())).rejects.toThrow(GenericErrors.NotFound);
  });
});
