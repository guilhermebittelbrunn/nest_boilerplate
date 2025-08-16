import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTaskService } from './createTask.service';
import { CreateTaskDTO } from './dto/createTask.dto';

import TaskMapper from '@/module/task/mappers/task.mapper';
import { ValidatedBody } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/task')
@ApiTags('task')
@UseGuards(JwtAuthGuard)
export class CreateTaskController {
  constructor(private readonly useCase: CreateTaskService) {}

  @Post('/')
  async handle(@ValidatedBody() body: CreateTaskDTO): Promise<UpdateResponseDTO> {
    const task = await this.useCase.execute(body);

    return TaskMapper.toDTO(task);
  }
}
