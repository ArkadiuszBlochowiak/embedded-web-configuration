import { Component, inject, input, model, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { ipAddressValidator, submaskValidator } from '../../services/settings.validator';
import { SettingsService } from '../../services/settings.service';
import { SettingsData } from '../../settings-info';

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
  settingsService = inject(SettingsService);
  initialSettings = input<SettingsData | null>(null);

  settingsForm = new FormGroup({
    deviceName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    }),
    ipAddress: new FormControl('', [Validators.required, ipAddressValidator]),
    subnetMask: new FormControl('', [Validators.required, submaskValidator]),
    gateway: new FormControl('', [Validators.required, ipAddressValidator]),
    dhcpMode: new FormControl(false),
  });

  ngOnChanges(changes: SimpleChanges<SettingsForm>) {
    if (changes.initialSettings && changes.initialSettings !== null) {
      const init = changes.initialSettings.currentValue;
      this.settingsForm.controls.deviceName.setValue(init?.deviceName || '');
      this.settingsForm.controls.ipAddress.setValue(init?.ipAddress || '');
      this.settingsForm.controls.subnetMask.setValue(init?.subnetMask || '');
      this.settingsForm.controls.gateway.setValue(init?.gateway || '');
      this.settingsForm.controls.dhcpMode.setValue(Boolean(init?.dhcpMode) || false);
    }
  }

  onSubmit() {
    console.log(this.settingsForm.value);
  }
}
