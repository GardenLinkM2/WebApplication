import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.scss']
})
export class UploadScreenComponent {

  constructor() { }
  cityPattern = /^[A-Za-z0-9 -]+$/; // Gestion rule 6
  streetNamePattern = /^[A-Za-z0-9 ]+$/; // Gestion rule 5
  onlyNumbers = /^[0-9]+$/;
  zipCodePattern = /^[0-9][0-9][0-9][0-9][0-9]$/;
  uploadForm = new FormGroup(
    {
      titleControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      surfaceControl: new FormControl('', [Validators.required, Validators.max(10 ** 4), Validators.pattern(this.onlyNumbers)]),
      priceControl: new FormControl('', [Validators.required, Validators.max(10 ** 4), Validators.pattern(this.onlyNumbers)]),
      durationMaxControl: new FormControl('', [Validators.required, Validators.pattern(this.onlyNumbers)]),
      addressControl: new FormGroup({
        streetNumControl: new FormControl('', Validators.pattern(this.onlyNumbers)),
        streetNameControl: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.maxLength(255), Validators.pattern(this.streetNamePattern)]),
        zipCodeControl: new FormControl('', [Validators.required, Validators.pattern(this.zipCodePattern), Validators.max(99999)]),
        cityControl: new FormControl('', [Validators.required, Validators.minLength(1),
          Validators.maxLength(255), Validators.pattern(this.cityPattern)])
      }),
      accessWaterControl: new FormControl(''),
      soilTypeControl: new FormControl(''),
      orientationControl: new FormControl(''),
      accessToolsControl: new FormControl(''),
      descriptionControl: new FormControl('', Validators.maxLength(25 * (10 ** 3))),
      picturesControl: new FormControl('')
    }
  );
  onSubmit() {
    // TODO: Replace the following line with an effective one.
    console.warn(this.uploadForm.value);
  }
}
