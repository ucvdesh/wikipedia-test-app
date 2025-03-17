import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLog } from './request-log.entity';

@Injectable()
export class RequestLogService {
  constructor(
    @InjectRepository(RequestLog)
    private readonly requestLogRepository: Repository<RequestLog>,
  ) {}

  async logRequest(
    method: string,
    url: string,
    statusCode?: number,
  ): Promise<RequestLog> {
    const log = this.requestLogRepository.create({ method, url, statusCode });
    return this.requestLogRepository.save(log);
  }
}
