import { Injectable } from '@nestjs/common'
import {
  DeletionsById,
  EmployeeCreate,
  EmployeePatch,
  PaginationParameters,
} from 'shared'

import { PrismaService } from './prisma.service'

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployeesPage(parameters: PaginationParameters) {
    return {
      data: await this.prisma.employee.findMany({
        ...parameters,
        where: {
          deletedAt: null,
        },
      }),
      total: await this.prisma.employee.count({
        where: {
          deletedAt: null,
        },
      }),
    }
  }

  createEmployee(data: EmployeeCreate) {
    return this.prisma.employee.create({
      data,
    })
  }

  patchEmployees(parameters: EmployeePatch) {
    const { id, ...data } = parameters

    return this.prisma.employee.update({
      data,
      where: {
        id,
      },
    })
  }

  deleteEmployees(parameters: DeletionsById) {
    return this.prisma.employee.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: {
          in: parameters.ids,
        },
      },
    })
  }
}
