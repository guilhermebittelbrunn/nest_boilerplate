import { Module } from '@nestjs/common';

import { CreateTaskModule } from './createTask/createTask.module';
import { DeleteTaskModule } from './deleteTask/deleteTask.module';
import { FindTaskByIdModule } from './findTaskById/findTaskById.module';
import { UpdateTaskModule } from './updateTask/updateTask.module';

@Module({
  imports: [CreateTaskModule, DeleteTaskModule, FindTaskByIdModule, UpdateTaskModule],
})
export class TaskModule {}
