import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function comparisonValidator(): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const control1 = group.get('password');
    const control2 = group.get('confirmPassword');
    if (control1.value !== control2.value && control1.enabled && control2.value !== null) {
      control2.setErrors({notEquivalent: 'Les deux saisies ne correspondent pas!'});
    } else {
      control2.setErrors(null);
    }
    return;
  };
}
