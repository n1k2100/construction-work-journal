import { createZodDto } from 'nestjs-zod'
import {
  WorkSchema,
  WorkCreateSchema,
  WorkPatchSchema,
  WorkPaginationSchema,
} from 'shared'

export class WorkDto extends createZodDto(WorkSchema) {}
export class WorkPatchDto extends createZodDto(WorkPatchSchema) {}
export class WorkCreateDto extends createZodDto(WorkCreateSchema) {}
export class WorkPaginationDto extends createZodDto(WorkPaginationSchema) {}
