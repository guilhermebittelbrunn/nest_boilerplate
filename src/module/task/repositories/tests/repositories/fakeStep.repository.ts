import { IStepRepository } from '../../step.repository.interface';

import Step from '@/module/task/domain/step';
import { FakeBaseRepository } from '@/shared/test/fakeBase.repository';

export class FakeStepRepository extends FakeBaseRepository<Step> implements IStepRepository {
  findCompleteById = jest.fn();
  findByIdentifier = jest.fn();
  list = jest.fn();
}
