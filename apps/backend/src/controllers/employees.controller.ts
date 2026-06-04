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

import { DeletionsBodyDto, PaginationQueryDto } from '../dto'
import {
  EmployeeCreateDto,
  EmployeeDto,
  EmployeePatchDto,
} from '../dto/employee.dto'
import { EmployeeService } from '../services'
import { PaginationParameters } from '../types'

@Controller()
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('employees')
  @ApiOperation({
    summary: 'Получение страницы c работниками.',
  })
  @ApiOkResponse({
    description: 'Результат получен успешно.',
    type: EmployeeDto,
  })
  @ApiBadRequestResponse({
    description: 'Невалидный запрос.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Ошибка на стороне сервера.',
  })
  getEmployees(@Query() query: PaginationQueryDto) {
    const parameters: PaginationParameters = {
      skip: query.skip ?? 0,
      take: query.take,
    }

    return this.employeeService.getEmployeesPage(parameters)
  }

  @Post('employees/create')
  createEmployee(@Body() body: EmployeeCreateDto) {
    return this.employeeService.createEmployee(body)
  }

  @Patch('employees/edit')
  @ApiOperation({
    summary: 'Обновление информации о сотруднике.',
  })
  patchEmployee(@Body() body: EmployeePatchDto) {
    return this.employeeService.patchEmployees(body)
  }

  @Delete('employees/delete')
  @ApiOperation({
    summary: 'Удаление сотрудников.',
  })
  deleteEmployees(@Body() body: DeletionsBodyDto) {
    return this.employeeService.deleteEmployees(body)
  }
}
