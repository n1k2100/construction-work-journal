import { Module } from '@nestjs/common'

import { EmployeesController } from '../controllers'
import { EmployeeService } from '../services'

@Module({
  controllers: [EmployeesController],
  imports: [],
  providers: [EmployeeService],
})
export class EmployeeModule {}
