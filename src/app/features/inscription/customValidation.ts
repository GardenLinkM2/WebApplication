import { FormGroup, ValidatorFn } from '@angular/forms';



export function equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} => {
    const target = group.controls[targetKey];
    const toMatch = group.controls[toMatchKey];
    if (target.touched) {
      const isMatch = target.value === toMatch.value;
      // set equal value error on dirty controls
      if (!isMatch && target.valid && toMatch.valid) {
        toMatch.setErrors({equalValue: targetKey});
        const message = targetKey + ' != ' + toMatchKey;
        return {'equalValue': message};
      }
      if (isMatch && toMatch.hasError('equalValue')) {
        toMatch.setErrors(null);
      }
    }

    return null;
  };
}

