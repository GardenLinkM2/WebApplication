import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../services/upload-add/upload.service';
import {Orientation} from '../../@entities/enum/orientation.enum';
import {GroundEnum} from '../../@entities/enum/ground.enum';
import {UploadAdBody} from '../../@entities/adUploadBody';
import {ConfirmationService, Message} from 'primeng/api';

interface Soil {
  type: string;
}

interface Direction {
  direction: string;
}

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.scss'],
  providers: [ConfirmationService]
})
export class UploadScreenComponent {
  soils: Soil[];
  uploadedFiles: any[] = [];
  directions: Direction[];
  msgs: Message[] = [];
  private requestBody: UploadAdBody;
  private id: string;
  constructor(private upload: UploadService, private confirmationService: ConfirmationService) {
    this.soils = [
      {type: GroundEnum.ARGILEUSE},
      {type: GroundEnum.SABLEUSE},
      {type: GroundEnum.TOURBEUSE},
      {type: GroundEnum.HUMIFERE},
      {type: GroundEnum.SILICEUSE},
      {type: GroundEnum.CALCAIRE}
    ];

    this.directions = [
      {direction: Orientation.NORD},
      {direction: Orientation.SUD},
      {direction: Orientation.EST},
      {direction: Orientation.OUEST}
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
      pictures: new FormControl(this.uploadedFiles)
    }
  );
  async onSubmit() {
    // TODO: Replace the following line with an effective one.
    if (this.uploadForm.valid) {
      await this.upload.getId().toPromise().then(
        // @ts-ignore
        response => this.id = response.data.id,
        error => console.log('Error', error)
      );
      this.requestBody = {
        id: this.id,
        name: this.uploadForm.get('title').value,
        description: this.uploadForm.get('description').value,
        size: 0,
        isReserved: false,
        minUse: this.uploadForm.get('durationMax').value,
        owner: this.id,
        validation: 0,
        location: {
          streetNumber: Number(this.uploadForm.get('address').get('streetNum').value),
          street: this.uploadForm.get('address').get('streetName').value,
          postalCode: Number(this.uploadForm.get('address').get('zipCode').value),
          city: this.uploadForm.get('address').get('city').value
        },
        criteria: {
          locationTime: 0,
          area: this.uploadForm.get('surface').value,
          price: this.uploadForm.get('price').value,
          orientation: this.uploadForm.get('orientation').value.direction,
          typeOfClay: this.uploadForm.get('soilType').value.type,
          equipments: this.uploadForm.get('accessTools').value,
          waterAccess: this.uploadForm.get('accessWater').value,
          directAccess: this.uploadForm.get('directAccess').value
        },
        photos: [
          {
            id: this.id,
            fileName: 'string'
          }
        ]
      };
      let filename;
      for (filename of this.uploadForm.get('pictures').value) {
        this.requestBody.photos.push({
          id: this.id,
          fileName: filename
        });
      }
      this.confirmPublish();
    }
  }

  confirmPublish() {
    this.confirmationService.confirm({
      message: 'Souhaitez vous publier le bien?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.upload.postGarden(this.requestBody).subscribe(
          () => {window.location.reload()},
          error => console.log('Error', error)
        );
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Votre annonce à été publiée !!!'}];
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'publication annulée.'}];
      }
    });
  }
  onUpload(event) { // Uploading image files
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
