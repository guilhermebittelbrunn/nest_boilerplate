import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import UpdateTaskErrors from './updateTask.error';
import { UpdateTaskService } from './updateTask.service';

import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { fakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { fakeTask } from '@/module/task/repositories/tests/entities/fakeTask';
import { FakeStepRepository } from '@/module/task/repositories/tests/repositories/fakeStep.repository';
import { FakeTaskRepository } from '@/module/task/repositories/tests/repositories/fakeTask.repository';
import { FakeUserRepository } from '@/module/user/repositories/tests/repositories/fakeUser.repository';
import { IUserRepositorySymbol } from '@/module/user/repositories/user.repository.interface';

describe('UpdateTaskService', () => {
  let service: UpdateTaskService;

  const stepRepoMock = new FakeStepRepository();
  const taskRepoMock = new FakeTaskRepository();
  const userRepoMock = new FakeUserRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTaskService,
        {
          provide: IStepRepositorySymbol,
          useValue: stepRepoMock,
        },
        {
          provide: ITaskRepositorySymbol,
          useValue: taskRepoMock,
        },
        {
          provide: IUserRepositorySymbol,
          useValue: userRepoMock,
        },
      ],
    }).compile();

    service = module.get<UpdateTaskService>(UpdateTaskService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a task successfully', async () => {
    const task = fakeTask();

    taskRepoMock.findById.mockResolvedValueOnce(task);
    taskRepoMock.update.mockResolvedValueOnce(task.id.toValue());

    const result = await service.execute({
      id: task.id.toValue(),
      title: faker.person.fullName(),
    });

    expect(result).toBe(task.id.toValue());
    expect(taskRepoMock.update).toHaveBeenCalled();
  });

  it('should throw a not found error if task does not exist', async () => {
    await expect(
      service.execute({
        id: faker.string.uuid(),
      }),
    ).rejects.toThrow(UpdateTaskErrors.TaskNotFound);
  });

  it('should throw a not found error if step does not exist', async () => {
    taskRepoMock.findById.mockResolvedValueOnce(fakeTask());
    stepRepoMock.findById.mockResolvedValueOnce(null);

    await expect(
      service.execute({
        id: faker.string.uuid(),
        stepId: faker.string.uuid(),
      }),
    ).rejects.toThrow(UpdateTaskErrors.StepNotFound);
  });

  it('should throw a conflict error if step has reached the max tasks limit', async () => {
    const step = fakeStep();

    const task = fakeTask();
    const tasks = Array.from({ length: 200 }, () => fakeTask({ stepId: step.id.toValue() }));

    step.tasks.add(...tasks);

    taskRepoMock.findById.mockResolvedValueOnce(task);
    stepRepoMock.findById.mockResolvedValueOnce(step);
    stepRepoMock.findCompleteById.mockResolvedValueOnce(step);

    await expect(
      service.execute({
        id: task.id.toValue(),
        stepId: step.id.toValue(),
      }),
    ).rejects.toThrow(UpdateTaskErrors.MaxTasksReached);
  });

  it('should throw a not found error if assignee does not exist', async () => {
    const task = fakeTask();

    taskRepoMock.findById.mockResolvedValueOnce(task);
    userRepoMock.findById.mockResolvedValueOnce(null);

    await expect(
      service.execute({
        id: task.id.toValue(),
        assigneeId: faker.string.uuid(),
      }),
    ).rejects.toThrow(UpdateTaskErrors.AssigneeNotFound);
  });
});
