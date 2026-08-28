import { Service } from '@angular/core';
import { SettingsData } from '../settings-info';

@Service()
export class SettingsService {
  protected url = 'http://localhost:3000/settings';

  async getSettings(): Promise<SettingsData> {
    const data = await fetch(this.url);
    return (await data.json()) || {};
  }
}
