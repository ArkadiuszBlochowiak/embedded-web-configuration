import { Component } from '@angular/core';
import { SettingsForm } from './components/settings-form/settings-form';

@Component({
  imports: [SettingsForm],
  selector: 'app-home',
  styleUrl: './home.css',
  // templateUrl: './home.html',
  template: ` <app-settings-form /> `,
})
export class Home {}
