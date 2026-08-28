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
    deviceName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    ipAddress: new FormControl('', [Validators.required, ipAddressValidator]),
    subnetMask: new FormControl('', [Validators.required, submaskValidator]),
    gateway: new FormControl('', [Validators.required, ipAddressValidator]),
    dhcpMode: new FormControl(false),
  });

  updateModel(data: SettingsData) {
    this.settingsForm.controls.deviceName.setValue(data.deviceName || '');
    this.settingsForm.controls.ipAddress.setValue(data.ipAddress || '');
    this.settingsForm.controls.subnetMask.setValue(data.subnetMask || '');
    this.settingsForm.controls.gateway.setValue(data.gateway || '');
    this.settingsForm.controls.dhcpMode.setValue(Boolean(data.dhcpMode) || false);
  }

  ngOnChanges(changes: SimpleChanges<SettingsForm>) {
    if (changes.initialSettings) {
      const init = changes.initialSettings.currentValue;
      if (init !== null) {
        this.updateModel(init);
      }
    }
  }

  onSubmit() {
    console.log(this.settingsForm.value);

    const model: SettingsData = {
      deviceName: this.settingsForm.value.deviceName ?? '',
      ipAddress: this.settingsForm.value.ipAddress ?? '',
      subnetMask: this.settingsForm.value.subnetMask ?? '',
      gateway: this.settingsForm.value.gateway ?? '',
      dhcpMode: this.settingsForm.value.dhcpMode ?? false,
    };

    this.settingsService.saveSettings(model).then((data: SettingsData) => {
      this.updateModel(data);
    });
  }
}
