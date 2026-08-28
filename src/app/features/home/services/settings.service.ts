import { Service } from '@angular/core';
import { SettingsData } from '../settings-info';

@Service()
export class SettingsService {
  protected url = '/api/settings';

  async delay() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(''), 1000);
    });
  }

  async getSettings(): Promise<SettingsData> {
    await this.delay();

    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) || {};
  }

  async saveSettings(data: SettingsData) {
    const response = await fetch(this.url, { method: 'PUT', body: JSON.stringify(data) });
    return (await response.json()) || {};
  }
}
