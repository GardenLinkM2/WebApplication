import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minUseMaxUse(): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const control1 = group.get('durationMax');
    const control2 = group.get('durationMin');
    if (control1.value < control2.value || control2.value < 1) {
      control2.setErrors({notEquivalent: 'La durée minimale ne peut etre supérieure a la durée maximale'});
    } else {
      control2.setErrors(null);
    }
    return;
  };
}
