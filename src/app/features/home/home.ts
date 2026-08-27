import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormInput } from '../../shared/components/form-input/form-input';
import { ipAddressValidator, submaskValidator } from './services/settings.validator';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    FormInput,
    MatSelect,
    MatOption,
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  // templateUrl: './home.html',
  template: `
    <form [formGroup]="settingsForm" (submit)="onSubmit()" class="settings-form">
      <span>General settings</span>
      <app-form-input [field]="settingsForm.controls.deviceName" label="Device name" />
      <span>Advanced settings</span>
      <app-form-input [field]="settingsForm.controls.ipAddress" label="IP address" />
      <app-form-input [field]="settingsForm.controls.subnetMask" label="Subnet mask" />
      <app-form-input [field]="settingsForm.controls.gateway" label="Gateway" />
      <mat-form-field>
        <mat-label>DHCP mode</mat-label>
        <mat-select [formControl]="settingsForm.controls.dhcpMode">
          <mat-option value="enabled">Enabled</mat-option>
          <mat-option value="disabled">Disabled</mat-option>
        </mat-select>
      </mat-form-field>
      <button matButton="outlined" type="submit">Save</button>
    </form>
  `,
})
export class Home {
  settingsForm = new FormGroup({
    deviceName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    }),
    ipAddress: new FormControl('', [Validators.required, ipAddressValidator]),
    subnetMask: new FormControl('', [Validators.required, submaskValidator]),
    gateway: new FormControl('', [Validators.required, ipAddressValidator]),
    dhcpMode: new FormControl(''),
  });

  onSubmit() {
    console.log(this.settingsForm.value);
  }
}
