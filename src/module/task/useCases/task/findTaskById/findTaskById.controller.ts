import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindTaskByIdResponseDTO } from './dto/findTaskById.dto.response';
import { FindTaskByIdService } from './findTaskById.service';

import TaskMapper from '@/module/task/mappers/task.mapper';
import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/task')
@ApiTags('task')
@UseGuards(JwtAuthGuard)
export class FindTaskByIdController {
  constructor(private readonly useCase: FindTaskByIdService) {}

  @Get('/:id')
  async handle(@ValidatedParams('id') id: string): Promise<FindTaskByIdResponseDTO> {
    const result = await this.useCase.execute(id);

    return TaskMapper.toDTO(result);
  }
}
