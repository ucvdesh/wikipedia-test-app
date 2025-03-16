// test/feed.service.spec.ts
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
    // Simula la respuesta HTTP
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of({ data: mockData }));

    const result = await service.getFeed('2023', '04', '15', 'en');
    expect(result).toEqual(mockData);
  });

  it('should return translated feed when translation is applied', async () => {
    // Simula datos de entrada y salida
    const feedData = {
      onthisday: [
        {
          text: 'Hello',
          pages: [
            { titles: { normalized: 'World' }, extract: 'Sample extract' },
          ],
        },
      ],
    };

    // Simula que la traducción devuelve el mismo texto para simplificar el test
    jest.spyOn(service, 'translateText').mockResolvedValue('Hola');

    const result = await service.translateFeed(feedData, 'es');
    // Esperamos que tanto el texto principal como los títulos y extractos hayan sido "traducidos" a 'Hola'
    expect(result.onthisday[0].text).toEqual('Hola');
    expect(result.onthisday[0].pages[0].titles.normalized).toEqual('Hola');
    expect(result.onthisday[0].pages[0].extract).toEqual('Hola');
  });
});
