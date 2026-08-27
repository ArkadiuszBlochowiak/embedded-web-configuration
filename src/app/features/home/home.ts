import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormInput } from '../../shared/components/form-input/form-input';
import { ipAddressValidator } from './services/settings.validator';

@Component({
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton, FormInput],
  selector: 'app-home',
  styleUrl: './home.css',
  // templateUrl: './home.html',
  template: `
    <form [formGroup]="settingsForm" (submit)="onSubmit()" class="settings-form">
      <span>General settings</span>
      <app-form-input [field]="settingsForm.controls.deviceName" label="Device name" />
      <span>Advanced settings</span>
      <app-form-input [field]="settingsForm.controls.ipAddress" label="IP address" />
      <mat-form-field>
        <mat-label>Subnet mask</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Gateway</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>DHCP mode (select)</mat-label>
        <input matInput />
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
    subnetMask: new FormControl(''),
    gateway: new FormControl(''),
    dhcpMode: new FormControl(''),
  });

  onSubmit() {
    console.log(this.settingsForm.value);
  }
}
