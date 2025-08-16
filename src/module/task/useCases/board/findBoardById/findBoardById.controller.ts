import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindBoardByIdService } from './findBoardById.service';

import { BoardDTO } from '@/module/task/dto/board.dto';
import BoardMapper from '@/module/task/mappers/board.mapper';
import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/board')
@ApiTags('board')
@UseGuards(JwtAuthGuard)
export class FindBoardByIdController {
  constructor(private readonly useCase: FindBoardByIdService) {}

  @Get('/:id')
  async handle(@ValidatedParams('id') id: string): Promise<BoardDTO> {
    const result = await this.useCase.execute(id);

    return BoardMapper.toDTO(result);
  }
}
