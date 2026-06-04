import z from 'zod'

import type { output } from 'zod'

export const paginationSchema = z.object({
  skip: z.coerce
    .number()
    .int()
    .min(0)
    .default(0)
    .describe('Пропуск записей (смещение)'),
  take: z.coerce
    .number()
    .int()
    .min(0)
    .default(10)
    .describe('Количество возвращаемых записей'),
})

export const deletionsByIdSchema = z.object({
  ids: z.array(z.uuid()),
})

export type PaginationParameters = output<typeof paginationSchema>
export type DeletionsById = output<typeof deletionsByIdSchema>
