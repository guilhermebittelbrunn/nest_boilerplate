import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateBoardDTO } from './dto/updateBoard.dto';
import { UpdateBoardService } from './updateBoard.service';

import { ValidatedBody, ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/board')
@ApiTags('board')
@UseGuards(JwtAuthGuard)
export class UpdateBoardController {
  constructor(private readonly useCase: UpdateBoardService) {}

  @Put('/:id')
  async handle(
    @ValidatedParams('id') id: string,
    @ValidatedBody() body: UpdateBoardDTO,
  ): Promise<UpdateResponseDTO> {
    const result = await this.useCase.execute({ ...body, id });

    return { id: result };
  }
}
