import { Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError],
  selector: 'app-form-input',
  styleUrl: './form-input.css',
  templateUrl: './form-input.html',
})
export class FormInput {
  field = input.required<FormControl<string | null>>();
  label = input.required<string>();

  errorMessage() {
    if (!this.field().invalid) return null;

    const errors = this.field().errors;
    if (!errors) return null;

    if (errors['required']) {
      return 'You must enter a value';
    }

    if (errors['minlength']) {
      const { requiredLength } = errors['minlength'];
      return `The minimum length is ${requiredLength} characters`;
    }

    if (errors['wrongAddressFormat']) {
      return 'Provide proper IP address format';
    }

    if (errors['wrongSubmaskFormat']) {
      return 'Provide proper subnet mask format';
    }

    return 'Invalid input';
  }
}
