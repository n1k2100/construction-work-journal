import { createZodDto } from 'nestjs-zod'
import { deletionsByIdSchema, paginationSchema } from 'shared'

export class DeletionsBodyDto extends createZodDto(deletionsByIdSchema) {}
export class PaginationQueryDto extends createZodDto(paginationSchema) {}
