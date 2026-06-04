import { Module } from '@nestjs/common'

import { WorksController } from '../controllers'
import { WorkService } from '../services'

@Module({
  controllers: [WorksController],
  imports: [],
  providers: [WorkService],
})
export class WorkModule {}
