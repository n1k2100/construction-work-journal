import { WorkVolumeUnit } from '@construction-work-journal/prisma/enums'
import z, { type output } from 'zod'

export const WorkTypeSchema = z.object({
  color: z.hex().max(6).min(6),
  deletedAt: z.iso.date().optional(),
  id: z.uuid(),
  title: z.string(),
  unit: z.enum<WorkVolumeUnit[]>(['KG', 'M', 'M2', 'M3', 'PCS', 'SET', 'TN']),
})

export const WorkTypePatchSchema = WorkTypeSchema.omit({
  deletedAt: true,
}).partial({
  color: true,
  title: true,
  unit: true,
})

export const WorkTypeCreateSchema = WorkTypeSchema.omit({
  deletedAt: true,
  id: true,
})

export type WorkType = output<typeof WorkTypeSchema>
export type WorkTypePatch = output<typeof WorkTypePatchSchema>
export type WorkTypeCreate = output<typeof WorkTypeCreateSchema>
