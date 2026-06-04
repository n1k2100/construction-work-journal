import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { PaginationParameters } from 'shared'

import {
  DeletionsBodyDto,
  PaginationQueryDto,
  WorkTypeCreateDto,
  WorkTypeDto,
  WorkTypePatchDto,
} from '../dto'
import { WorksTypeService } from '../services'

@Controller()
export class WorksTypeController {
  constructor(private readonly worksTypeService: WorksTypeService) {}

  @Get('works-type')
  @ApiOperation({
    summary: 'Получение страницы типов работ.',
  })
  getWorksType(@Query() query: PaginationQueryDto) {
    const parameters: PaginationParameters = {
      skip: query.skip ?? 0,
      take: query.take,
    }

    return this.worksTypeService.getWorksType(parameters)
  }

  @Post('works-type/create')
  @ApiOperation({
    summary: 'Создание нового типа работ.',
  })
  @ApiOkResponse({
    type: WorkTypeDto,
  })
  createWorkType(@Body() body: WorkTypeCreateDto) {
    return this.worksTypeService.createWorkType(body)
  }

  @Patch('works-type/edit')
  @ApiOperation({
    summary: 'Редактирование существующего типа работ по его ID.',
  })
  @ApiOkResponse({
    type: WorkTypeDto,
  })
  updateWorkType(@Body() body: WorkTypePatchDto) {
    return this.worksTypeService.patchWorkType(body)
  }

  @Delete('works-type/delete')
  @ApiOperation({
    summary: 'Удаление существующих типов работ по их ID.',
  })
  deleteWorksType(@Body() body: DeletionsBodyDto) {
    return this.worksTypeService.deleteWorksType(body)
  }
}
