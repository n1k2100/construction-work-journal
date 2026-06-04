import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { WorkPagination } from 'shared'

import {
  DeletionsBodyDto,
  PaginationQueryDto,
  WorkCreateDto,
  WorkDto,
  WorkPaginationDto,
  WorkPatchDto,
} from '../dto'
import { WorkService } from '../services/work.service'

@Controller()
export class WorksController {
  constructor(private readonly workService: WorkService) {}

  @Get('works')
  @ApiOperation({
    summary: 'Получение страницы работ.',
  })
  @ApiOkResponse({
    description: 'Результат получен успешно.',
    type: WorkDto,
  })
  @ApiBadRequestResponse({
    description: 'Невалидный запрос.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Ошибка на стороне сервера.',
  })
  getWorks(@Query() query: WorkPaginationDto) {
    console.log(query)

    const parameters: WorkPagination = {
      orderBy: query.orderBy ?? {},
      skip: query.skip ?? 0,
      take: query.take,
    }

    return this.workService.getWorksPage(parameters)
  }

  @Post('works/create')
  @ApiOperation({
    summary: 'Создание новой работы.',
  })
  @ApiOkResponse({
    description: 'Добавление прошло успешно.',
    type: WorkDto,
  })
  createWork(@Body() body: WorkCreateDto) {
    return this.workService.createWork(body)
  }

  @Patch('works/edit')
  @ApiOkResponse({
    description: 'Редактирование прошло успешно.',
    type: WorkDto,
  })
  @ApiOperation({
    summary: 'Редактирование существующей работы по её ID.',
  })
  editWork(@Body() body: WorkPatchDto) {
    return this.workService.patchWork(body)
  }

  @Delete('works/delete')
  @ApiOperation({
    summary: 'Удаление существующих работ по их ID.',
  })
  deleteWorks(@Body() body: DeletionsBodyDto) {
    return this.workService.deleteWorks(body)
  }
}
