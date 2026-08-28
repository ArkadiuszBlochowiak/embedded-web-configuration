import { Component, inject, signal } from '@angular/core';
import { SettingsForm } from './components/settings-form/settings-form';
import { SettingsService } from './services/settings.service';
import { SettingsData } from './settings-info';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [SettingsForm, MatProgressSpinner],
  selector: 'app-home',
  styleUrl: './home.css',
  // templateUrl: './home.html',
  template: `
    @if (isLoading()) {
      <div class="home-loading">
        <mat-progress-spinner mode="indeterminate" />
      </div>
    } @else {
      <app-settings-form [initialSettings]="initialSettings()" />
    }

    <!-- {{ initialSettings() }} -->
  `,
})
export class Home {
  settingsService = inject(SettingsService);
  initialSettings = signal<SettingsData | null>(null);
  isLoading = signal(false);

  constructor() {
    this.isLoading.set(true);
    this.settingsService.getSettings().then((data: SettingsData) => {
      this.initialSettings.set(data);
      this.isLoading.set(false);
      console.log(this.initialSettings());
    });
  }
}
