// src/feed/dto/feed-query.dto.ts
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class FeedQueryDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly year: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly month: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly day: string;

  @IsOptional()
  readonly language?: string;
}
