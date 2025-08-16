import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateTaskDTO } from './dto/updateTask.dto';
import { UpdateTaskService } from './updateTask.service';

import { ValidatedBody, ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/task')
@ApiTags('task')
@UseGuards(JwtAuthGuard)
export class UpdateTaskController {
  constructor(private readonly useCase: UpdateTaskService) {}

  @Put('/:id')
  async handle(
    @ValidatedParams('id') id: string,
    @ValidatedBody() body: UpdateTaskDTO,
  ): Promise<UpdateResponseDTO> {
    const result = await this.useCase.execute({ ...body, id });

    return { id: result };
  }
}
