import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import CreateTaskErrors from './createTask.error';
import { CreateTaskService } from './createTask.service';

import { IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import { ITaskRepositorySymbol } from '@/module/task/repositories/task.repository.interface';
import { fakeStep } from '@/module/task/repositories/tests/entities/fakeStep';
import { fakeTask } from '@/module/task/repositories/tests/entities/fakeTask';
import { FakeStepRepository } from '@/module/task/repositories/tests/repositories/fakeStep.repository';
import { FakeTaskRepository } from '@/module/task/repositories/tests/repositories/fakeTask.repository';
import { FakeUserRepository } from '@/module/user/repositories/tests/repositories/fakeUser.repository';
import { IUserRepositorySymbol } from '@/module/user/repositories/user.repository.interface';

describe('CreateTaskService', () => {
  let service: CreateTaskService;

  const taskRepoMock = new FakeTaskRepository();
  const stepRepoMock = new FakeStepRepository();
  const userRepoMock = new FakeUserRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskService,
        {
          provide: ITaskRepositorySymbol,
          useValue: taskRepoMock,
        },
        {
          provide: IStepRepositorySymbol,
          useValue: stepRepoMock,
        },
        {
          provide: IUserRepositorySymbol,
          useValue: userRepoMock,
        },
      ],
    }).compile();

    service = module.get<CreateTaskService>(CreateTaskService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task successfully', async () => {
    const step = fakeStep();
    const task = fakeTask({ stepId: step.id.toValue() });

    stepRepoMock.findCompleteById.mockResolvedValueOnce(step);
    taskRepoMock.create.mockResolvedValueOnce(task);

    const result = await service.execute({
      stepId: step.id.toValue(),
      title: task.title,
    });

    expect(result).toBe(task);
    expect(stepRepoMock.findCompleteById).toHaveBeenCalledWith(step.id.toValue());
    expect(taskRepoMock.create).toHaveBeenCalled();
  });

  it('should throw a not found error if step not found', async () => {
    const step = fakeStep();

    stepRepoMock.findCompleteById.mockResolvedValueOnce(null);

    await expect(
      service.execute({
        stepId: step.id.toValue(),
        title: faker.person.fullName(),
      }),
    ).rejects.toThrow(CreateTaskErrors.StepNotFound);

    expect(stepRepoMock.findCompleteById).toHaveBeenCalledWith(step.id.toValue());
  });

  it('should throw a not found error if assignee not found', async () => {
    const step = fakeStep();
    const task = fakeTask({ stepId: step.id.toValue() });

    stepRepoMock.findCompleteById.mockResolvedValueOnce(step);
    userRepoMock.findById.mockResolvedValueOnce(null);

    await expect(
      service.execute({
        stepId: step.id.toValue(),
        title: task.title,
        assigneeId: faker.string.uuid(),
      }),
    ).rejects.toThrow(CreateTaskErrors.AssigneeNotFound);
  });

  it('should throw a max tasks reached error if max tasks reached', async () => {
    const step = fakeStep();
    const tasks = Array.from({ length: 201 }, () => fakeTask({ stepId: step.id.toValue() }));

    step.tasks.add(...tasks);

    stepRepoMock.findCompleteById.mockResolvedValueOnce(step);

    await expect(
      service.execute({
        stepId: step.id.toValue(),
        title: faker.person.fullName(),
      }),
    ).rejects.toThrow(CreateTaskErrors.MaxTasksReached);
  });
});
