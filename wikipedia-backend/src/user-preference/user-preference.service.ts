import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreference } from './user-preference.entity';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectRepository(UserPreference)
    private readonly userPreferenceRepository: Repository<UserPreference>,
  ) {}

  async getUserPreference(userId: string): Promise<UserPreference> {
    let preference = await this.userPreferenceRepository.findOne({
      where: { userId },
    });
    if (!preference) {
      preference = this.userPreferenceRepository.create({ userId });
      await this.userPreferenceRepository.save(preference);
    }
    return preference;
  }

  async updateUserPreference(
    userId: string,
    updatedData: Partial<UserPreference>,
  ): Promise<UserPreference> {
    let preference = await this.getUserPreference(userId);
    preference = { ...preference, ...updatedData };
    return this.userPreferenceRepository.save(preference);
  }
}
