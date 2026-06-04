import { Module } from '@nestjs/common'

import { WorksTypeController } from '../controllers'
import { WorksTypeService } from '../services'

@Module({
  controllers: [WorksTypeController],
  imports: [],
  providers: [WorksTypeService],
})
export class WorkTypeModule {}
