import { createZodDto } from 'nestjs-zod'
import {
  WorkTypeCreateSchema,
  WorkTypePatchSchema,
  WorkTypeSchema,
} from 'shared'

export class WorkTypeDto extends createZodDto(WorkTypeSchema) {}
export class WorkTypePatchDto extends createZodDto(WorkTypePatchSchema) {}
export class WorkTypeCreateDto extends createZodDto(WorkTypeCreateSchema) {}
