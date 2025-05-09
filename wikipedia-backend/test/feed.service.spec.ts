import { WikipediaFeaturedContent } from './../src/feed/feed.interface';
// test/feed.service.spec.ts
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from '../src/feed/feed.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('FeedService', () => {
  let service: FeedService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FeedService],
    }).compile();

    service = module.get<FeedService>(FeedService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch feed data from Wikipedia API', async () => {
    const mockData = { onthisday: [] };
    jest.spyOn(httpService, 'get').mockImplementation(() =>
      of({
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config: {
          headers: {
            'content-type': 'application/json',
          } as unknown as AxiosRequestHeaders,
        },
      } as AxiosResponse),
    );

    const result = await service.getFeed('2023', '04', '15', 'en');
    expect(result).toEqual(mockData);
  });

  it('should return translated feed when translation is applied', async () => {
    // Simula datos de entrada y salida
    const feedData: WikipediaFeaturedContent = {
      onthisday: [
        {
          text: 'Hello',
          pages: [
            {
              titles: { normalized: 'World' },
              extract: 'Sample extract',
              wikibase_item: 'Q12345',
            },
          ],
        },
      ],
    };

    jest.spyOn(service, 'translateText').mockResolvedValue('Hola');

    const result = await service.translateFeed(feedData, 'es');
    expect(result?.onthisday?.[0]?.text).toEqual('Hola');
    expect(result?.onthisday?.[0].pages[0].titles.normalized).toEqual('Hola');
    expect(result?.onthisday?.[0].pages[0].extract).toEqual('Hola');
  });
});
