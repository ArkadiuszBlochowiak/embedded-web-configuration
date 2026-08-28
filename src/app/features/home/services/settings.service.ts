import { Service } from '@angular/core';
import { SettingsData } from '../settings-info';

@Service()
export class SettingsService {
  protected url = 'http://localhost:3000/settings';

  async delay() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(''), 1000);
    });
  }

  async getSettings(): Promise<SettingsData> {
    await this.delay();

    const data = await fetch(this.url);
    return (await data.json()) || {};
  }
}
