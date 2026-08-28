import { Component, inject, signal } from '@angular/core';
import { SettingsForm } from './components/settings-form/settings-form';
import { SettingsService } from './services/settings.service';
import { SettingsData } from './settings-info';

@Component({
  imports: [SettingsForm],
  selector: 'app-home',
  styleUrl: './home.css',
  // templateUrl: './home.html',
  template: ` <app-settings-form [initialSettings]="initialSettings()" /> `,
})
export class Home {
  settingsService = inject(SettingsService);
  initialSettings = signal<SettingsData | null>(null);

  constructor() {
    this.settingsService.getSettings().then((data: SettingsData) => {
      this.initialSettings.set(data);

      console.log(this.initialSettings());
    });
  }
}
