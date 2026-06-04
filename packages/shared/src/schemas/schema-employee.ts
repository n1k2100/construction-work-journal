import z from 'zod'

import { paginationSchema } from './schema-base.ts'

import type { EmployeePosition } from '@construction-work-journal/prisma/enums'
import type { output } from 'zod'

export const EmployeeSchema = z.object({
  deletedAt: z.iso.datetime().optional(),
  fullName: z.string(),
  id: z.uuid(),
  position: z.enum<EmployeePosition[]>(['foreman', 'worker']),
})

export const EmployeePatchSchema = EmployeeSchema.omit({
  deletedAt: true,
}).partial({
  fullName: true,
  position: true,
})

export const EmployeeCreateSchema = EmployeeSchema.omit({
  deletedAt: true,
  id: true,
})

export type Employee = output<typeof EmployeeSchema>
export type EmployeePatch = output<typeof EmployeePatchSchema>
export type EmployeeCreate = output<typeof EmployeeCreateSchema>
