// src/feed/feed.controller.ts
import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed-query.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(@Query() query: FeedQueryDto) {
    try {
      // Se utiliza el idioma del query o se asume 'en' por defecto
      const language = query.language || 'en';
      const data = await this.feedService.getFeed(
        query.year,
        query.month,
        query.day,
        language,
      );
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('translate/:targetLanguage')
  async getTranslatedFeed(
    @Param('targetLanguage') targetLanguage: string,
    @Query() query: FeedQueryDto,
  ) {
    try {
      const language = query.language || 'en';
      const data = await this.feedService.getFeed(
        query.year,
        query.month,
        query.day,
        language,
      );
      const translatedData = await this.feedService.translateFeed(
        data,
        targetLanguage,
      );
      return translatedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
