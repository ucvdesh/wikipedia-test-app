// test/feed.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from '../src/feed/feed.controller';
import { FeedService } from '../src/feed/feed.service';

describe('FeedController', () => {
  let controller: FeedController;
  let feedService: FeedService;

  const mockFeedService = {
    getFeed: jest.fn().mockResolvedValue({ onthisday: [] }),
    translateFeed: jest.fn().mockResolvedValue({ onthisday: [] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: mockFeedService,
        },
      ],
    }).compile();

    controller = module.get<FeedController>(FeedController);
    feedService = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return feed data', async () => {
    const query = { year: '2023', month: '04', day: '15', language: 'en' };
    const result = await controller.getFeed(query);
    expect(result).toEqual({ onthisday: [] });
    expect(feedService.getFeed).toHaveBeenCalledWith(
      query.year,
      query.month,
      query.day,
      'en',
    );
  });

  it('should return translated feed data', async () => {
    const query = { year: '2023', month: '04', day: '15', language: 'en' };
    const targetLanguage = 'es';
    const result = await controller.getTranslatedFeed(targetLanguage, query);
    expect(result).toEqual({ onthisday: [] });
    expect(feedService.getFeed).toHaveBeenCalledWith(
      query.year,
      query.month,
      query.day,
      'en',
    );
    expect(feedService.translateFeed).toHaveBeenCalled();
  });
});
