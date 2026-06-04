import { Module, Global } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'

import { WorkService, EmployeeService } from '../services'

import { EmployeeModule } from './employee.module'
import { PrismaModule } from './prisma.module'
import { WorkTypeModule } from './work-type.module'
import { WorkModule } from './work.module'

@Global()
@Module({
  exports: [],
  imports: [PrismaModule, WorkModule, WorkTypeModule, EmployeeModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    WorkService,
    WorkTypeModule,
    EmployeeService,
  ],
})
export class AppModule {}
