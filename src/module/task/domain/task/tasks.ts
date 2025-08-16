import Task from './task';

import Aggregate from '@/shared/core/domain/Aggregate';
import { TaskPriorityEnum } from '@/shared/types/task/task';

export class Tasks extends Aggregate<Task> {
  private constructor(initialItems?: Array<Task>) {
    super(initialItems);
  }

  compareItems(a: Task, b: Task): boolean {
    return a.equals(b);
  }

  get lowPriority(): Task[] {
    return this.items.filter((task) => task.priority?.value === TaskPriorityEnum.LOW);
  }

  get mediumPriority(): Task[] {
    return this.items.filter((task) => task.priority?.value === TaskPriorityEnum.MEDIUM);
  }

  get highPriority(): Task[] {
    return this.items.filter((task) => task.priority?.value === TaskPriorityEnum.HIGH);
  }

  public static create(initialItems?: Array<Task>): Tasks {
    return new Tasks(initialItems);
  }
}
