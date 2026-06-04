import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { PaginationParameters } from 'shared'

import {
  DeletionsBodyDto,
  PaginationQueryDto,
  WorkTypeCreateDto,
  WorkTypePatchDto,
} from '../dto'
import { WorksTypeService } from '../services'

@Controller()
export class WorksTypeController {
  constructor(private readonly worksTypeService: WorksTypeService) {}

  @Get('works-type')
  getWorksType(@Query() query: PaginationQueryDto) {
    const parameters: PaginationParameters = {
      orderBy: query.orderBy,
      skip: query.skip ?? 0,
      take: query.take,
    }

    return this.worksTypeService.getWorksType(parameters)
  }

  @Post('works-type/create')
  createWorkType(@Body() body: WorkTypeCreateDto) {
    return this.worksTypeService.createWorkType(body)
  }

  @Patch('works-type/edit')
  updateWorkType(@Body() body: WorkTypePatchDto) {
    return this.updateWorkType(body)
  }

  @Delete('works-type/delete')
  deleteWorksType(@Body() body: DeletionsBodyDto) {
    return this.worksTypeService.deleteWorksType(body)
  }
}
