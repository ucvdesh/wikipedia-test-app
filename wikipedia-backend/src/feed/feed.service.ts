// src/feed/feed.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WikipediaFeaturedContent } from './feed.interface';

@Injectable()
export class FeedService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getFeed(
    year: string,
    month: string,
    day: string,
    language: string,
  ): Promise<WikipediaFeaturedContent> {
    try {
      const url = `${this.configService.get<string>('WIKIPEDIA_URL')}/${language}/featured/${year}/${month}/${day}`;
      const token = this.configService.get<string>('WIKIPEDIA_TOKEN');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Api-User-Agent': 'Wikipedia Featured Content',
      };
      const response$ = this.httpService.get<WikipediaFeaturedContent>(url, {
        headers,
      });
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw new HttpException(
        'Error fetching feed from Wikipedia',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async translateFeed(
    feedData: WikipediaFeaturedContent,
    targetLanguage: string,
  ): Promise<WikipediaFeaturedContent> {
    try {
      // Verifica que feedData tenga la estructura esperada
      if (!feedData.onthisday) {
        return feedData;
      }
      const items = feedData.onthisday;
      for (const item of items) {
        // Traduce el texto principal (si existe)
        if (item.text) {
          item.text = await this.translateText(item.text, targetLanguage);
        }
        // Traduce los títulos y extractos de las páginas
        if (item.pages && Array.isArray(item.pages)) {
          for (const page of item.pages) {
            if (page.titles && page.titles.normalized) {
              page.titles.normalized = await this.translateText(
                page.titles.normalized,
                targetLanguage,
              );
            }
            if (page.extract) {
              page.extract = await this.translateText(
                page.extract,
                targetLanguage,
              );
            }
          }
        }
      }
      return feedData;
    } catch (error) {
      console.error('Error translating feed:', error);
      throw new HttpException('Error translating feed', HttpStatus.BAD_REQUEST);
    }
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const url = this.configService.get<string>('TRANSLATION_API_URL') || '';
      const payload = {
        q: text,
        source: 'en',
        target: targetLanguage,
        format: 'text',
      };

      const response$ = this.httpService.post<{ translatedText: string }>(
        url,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const response = await firstValueFrom(response$);
      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
}
