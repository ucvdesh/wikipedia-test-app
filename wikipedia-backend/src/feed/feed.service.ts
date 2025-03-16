// src/feed/feed.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(private readonly httpService: HttpService) {}

  async getFeed(
    year: string,
    month: string,
    day: string,
    language: string,
  ): Promise<any> {
    try {
      const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}`;
      const headers = {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NmY4ZmI1OGE2ZjQyN2M4YzFkYzExM2VjNWUzMGNjYiIsImp0aSI6ImJhYTQyYjE2MmU5MzEzMDdiYTk5NGNjZjM1ZjllOWViYjhkM2Q4OTc0OTM0ZmMwODUxZGVhYzdjZWIxOWM5YzgxOGYwZjY0NjliZjgxMGZhIiwiaWF0IjoxNzQyMDg4MjYwLjg5NzUyOSwibmJmIjoxNzQyMDg4MjYwLjg5NzUzMSwiZXhwIjozMzI5ODk5NzA2MC44OTU2MjIsInN1YiI6Ijc3ODkyOTA0IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.EhCr1GwQDNIhyiL7Un_JqUbWgi12pok2M1KlRHY0_gM5PvLGNek-QW9YgO1tM8giQzSfweiSccnu0sVXMtEEwgkXpu04Rknkl75TU0fDibscWeOVEISQbur-g58ZyyiXxhtD7l4ke-Zg1vnJ-a1OIiH5P9HhHfRyJPc_hjdp6-d7xEYxzxr0nxHJxGtKVLrcAGL0oFCTp9fW20DlJgZEuaifNa5XDEKhVTvA824FM8Leufkg37CMMl-AvjaC5l8t3wi7tpNh0JcwprbYktrgYbklbctWvBEYF4iaoWpktDbQjGTEbC0ERujgGhxeP5LD0gtnx4bt2wZJMe0fPqg8DZHaDo321ZCpNYxMaXbVFek_MWAuvhhYXd-NpJM68wuSGjtUF61M0x6XUtvNjkR0JDIMRXF0f5vz0it8vOG4j6UUZj6UghGa6GCVohxdcNgYmoFurJ2crTb6urJ9AHE1qFlZ14Zelyj8-XsL-t_8fLb9nE0RrGvnQXhKSDVqEsgJxQ2AUda8ni9FY9_rFXpao8bd5tL4g10ldfMct-ORBUU-gVcWqJszBpKgsDW7QLdmJ7K2xA68Snn1drgHQCxkoNjv1PrTTQAYuvwTPohoASV4dpYgSqalB5WMPjK4q3M-zAQZmQPAFK2iDunm3TrjsQFRyVlL2w0ulp-nMAwL3TU',
        'Api-User-Agent': 'Wikipedia Featured Content',
      };
      const response$ = this.httpService.get(url, { headers });
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

  async translateFeed(feedData: any, targetLanguage: string): Promise<any> {
    try {
      // Verifica que feedData tenga la estructura esperada
      if (!feedData.onthisday) {
        return feedData;
      }
      const items = feedData.onthisday;
      for (let item of items) {
        // Traduce el texto principal (si existe)
        if (item.text) {
          item.text = await this.translateText(item.text, targetLanguage);
        }
        // Traduce los títulos y extractos de las páginas
        if (item.pages && Array.isArray(item.pages)) {
          for (let page of item.pages) {
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
      const url = 'http://127.0.0.1:5000/translate';
      const payload = {
        q: text,
        source: 'en',
        target: targetLanguage,
        format: 'text',
      };

      const response$ = this.httpService.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      const response = await firstValueFrom(response$);
      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
}
