import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from './request-log.entity';
import { RequestLogService } from './request-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestLog])],
  providers: [RequestLogService],
  exports: [RequestLogService],
})
export class RequestLogModule {}
