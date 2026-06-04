import { Injectable } from '@nestjs/common'
import {
  DeletionsById,
  PaginationParameters,
  WorkCreate,
  WorkPatch,
} from 'shared'

import { PrismaService } from './prisma.service'

@Injectable()
export class WorkService {
  constructor(private readonly prisma: PrismaService) {}

  createWork(data: WorkCreate) {
    return this.prisma.work.create({
      data: {
        date: new Date(data.date),
        employee: { connect: { id: data.employeeId } },
        type: { connect: { id: data.typeId } },
        volume: data.volume,
      },
    })
  }

  patchWork(parameters: WorkPatch) {
    const { date, employeeId, id, typeId, volume } = parameters

    return this.prisma.work.update({
      data: {
        date: date ? new Date(date) : undefined,
        volume,
        ...(employeeId && { employee: { connect: { id: employeeId } } }),
        ...(typeId && { type: { connect: { id: typeId } } }),
      },
      where: { id },
    })
  }

  async getWorksPage(parameters: PaginationParameters) {
    return {
      data: await this.prisma.work.findMany({
        ...parameters,
        include: {
          employee: true,
          type: true,
        },
        where: {
          deletedAt: null,
        },
      }),
      total: await this.prisma.work.count({
        where: {
          deletedAt: null,
        },
      }),
    }
  }

  deleteWorks(deletionsId: DeletionsById) {
    return this.prisma.work.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: {
          in: deletionsId,
        },
      },
    })
  }
}
