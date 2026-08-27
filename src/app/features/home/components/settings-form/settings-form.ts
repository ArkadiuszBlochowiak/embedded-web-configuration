import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { ipAddressValidator, submaskValidator } from '../../services/settings.validator';

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
  selector: 'app-settings-form',
  styleUrl: './settings-form.css',
  templateUrl: './settings-form.html',
})
export class SettingsForm {
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
