import type { Work } from 'shared'

export const POSITION_LABELS: Record<Work['employee']['position'], string> = {
  foreman: 'Бригадир',
  worker: 'Работник',
}

export const UNIT_LABELS: Record<Work['type']['unit'], string> = {
  KG: 'кг',
  M: 'м',
  M2: 'м²',
  M3: 'м³',
  PCS: 'шт',
  SET: 'компл.',
  TN: 'т',
}

export const ROUTES = {
  JOURNAL: '/',
  REFERENCES: {
    LITERAL: '/references',
    WORKS_TYPE: '/references/works-type',
    EMPLOYEES: '/references/employees',
  },
} as const
