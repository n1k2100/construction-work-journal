import { createZodDto } from 'nestjs-zod'
import {
  EmployeeCreateSchema,
  EmployeePatchSchema,
  EmployeeSchema,
} from 'shared'

export class EmployeeDto extends createZodDto(EmployeeSchema) {}
export class EmployeePatchDto extends createZodDto(EmployeePatchSchema) {}
export class EmployeeCreateDto extends createZodDto(EmployeeCreateSchema) {}
