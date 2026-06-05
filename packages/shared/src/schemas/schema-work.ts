import { z } from 'zod'

import { paginationSchema } from './schema-base.ts'
import { EmployeeSchema } from './schema-employee.ts'
import { WorkTypeSchema } from './schema-work-type.ts'

import type { output } from 'zod'

export const WorkSchema = z.object({
  date: z.iso.datetime(),
  employee: EmployeeSchema,
  id: z.uuid(),
  type: WorkTypeSchema,
  volume: z.float64().min(0),
})

export const WorkCreateSchema = z.object({
  date: z.iso.datetime().describe('Дата выполнения'),
  employeeId: z.uuid().describe('ID сотрудника'),
  typeId: z.uuid().describe('ID типа работ'),
  volume: z.coerce.number().min(0).describe('Объем работ'),
})

export const WorkPatchSchema = WorkCreateSchema.partial().extend({
  id: z.uuid(),
})

export const WorkPaginationSchema = paginationSchema.extend(
  z.object({
    orderBy: z
      .object({
        date: z.enum(['asc', 'desc']),
      })
      .partial()
      .optional(),
  }).shape,
)

export type WorkCreate = output<typeof WorkCreateSchema>
export type WorkPatch = output<typeof WorkPatchSchema>
export type Work = output<typeof WorkSchema>
export type WorkPagination = output<typeof WorkPaginationSchema>
