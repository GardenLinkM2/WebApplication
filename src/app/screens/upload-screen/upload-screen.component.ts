import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UploadService} from './upload.service';

interface Soil {
  type: string;
}

interface Orientation {
  direction: string;
}

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.scss']
})
export class UploadScreenComponent {
  private soils: Soil[];
  private uploadedFiles: any[] = [];
  private directions: Orientation[];
  constructor(private upload: UploadService) {
    this.soils = [
      {type: 'Argileuse'},
      {type: 'Sableuse'},
      {type: 'Tourbeuse'},
      {type: 'Humifère'},
      {type: 'Siliceuse'},
      {type: 'Calcaire'}
    ];

    this.directions = [
      {direction: 'Nord'},
      {direction: 'Sud'},
      {direction: 'Est'},
      {direction: 'Ouest'}
    ];
  }
  cityPattern = /^[A-Za-z0-9 -]+$/; // Gestion rule 6
  streetNamePattern = /^[A-Za-z0-9 ]+$/; // Gestion rule 5
  onlyNumbers = /^[0-9]+$/;
  zipCodePattern = /^[0-9][0-9][0-9][0-9][0-9]$/;
  uploadForm = new FormGroup( // Garden upload form
    {
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      surface: new FormControl('', [Validators.required, Validators.max(10 ** 4), Validators.pattern(this.onlyNumbers)]),
      price: new FormControl('', [Validators.required, Validators.max(10 ** 4), Validators.pattern(this.onlyNumbers)]),
      durationMax: new FormControl('', [Validators.required, Validators.pattern(this.onlyNumbers)]),
      address: new FormGroup({
        streetNum: new FormControl('', Validators.pattern(this.onlyNumbers)),
        streetName: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.maxLength(255), Validators.pattern(this.streetNamePattern)]),
        zipCode: new FormControl('', [Validators.required, Validators.pattern(this.zipCodePattern), Validators.max(99999)]),
        city: new FormControl('', [Validators.required, Validators.minLength(1),
          Validators.maxLength(255), Validators.pattern(this.cityPattern)])
      }),
      soilType: new FormControl(''),
      orientation: new FormControl(''),
      accessWater: new FormControl(false),
      accessTools: new FormControl(false),
      directAccess: new FormControl(false),
      description: new FormControl('', Validators.maxLength(25 * (10 ** 3))),
      pictures: new FormControl('')
    }
  );
  onSubmit() {
    // TODO: Replace the following line with an effective one.
    if (this.uploadForm.valid) {
      this.upload.postGarden(this.uploadForm).subscribe(
        response => console.log('Response', response),
        error => console.log('Failure', error)
      );
    }
  }

  onUpload(event) { // Uploading image files
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
