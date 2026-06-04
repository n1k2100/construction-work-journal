import { Injectable } from '@nestjs/common'
import {
  DeletionsById,
  PaginationParameters,
  WorkTypeCreate,
  WorkTypePatch,
} from 'shared'

import { PrismaService } from './prisma.service'

@Injectable()
export class WorksTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorksType(parameters: PaginationParameters) {
    return {
      data: await this.prisma.workType.findMany({
        ...parameters,
        where: {
          deletedAt: null,
        },
      }),
      total: await this.prisma.workType.count({
        where: {
          deletedAt: null,
        },
      }),
    }
  }

  createWorkType(parameters: WorkTypeCreate) {
    return this.prisma.workType.create({
      data: parameters,
    })
  }

  patchWorkType(parameters: WorkTypePatch) {
    const { id, ...data } = parameters

    return this.prisma.workType.update({
      data,
      where: {
        id,
      },
    })
  }

  deleteWorksType(ids: DeletionsById) {
    return this.prisma.workType.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: {
          in: ids,
        },
      },
    })
  }
}
