import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../services/upload-add/upload.service';
import {Orientation} from '../../@entities/enum/orientation.enum';
import {GroundEnum} from '../../@entities/enum/ground.enum';
import {UploadAdBody} from '../../@entities/adUploadBody';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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
  providers: [ConfirmationService, MessageService]
})
export class UploadScreenComponent implements OnInit {
  soils: Soil[];
  uploadedFiles: any[] = [];
  directions: Direction[];
  message: string;
  MAX_FILES = 5;
  action = 'POST';
  responsdata: any;
  buttonLabel = 'publier';
  title = 'PUBLIER UNE ANNONCE';
  private requestBody: UploadAdBody;
  private id: string;
  private previewUrls = [];
  private confirmationMessage = 'Souhaitez vous publier le bien?';
  constructor(private client: HttpClient,
              private upload: UploadService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) {
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
  cityPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/; // Gestion rule 6
  streetNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/; // Gestion rule 5
  onlyNumbers = /^[0-9]+$/;
  zipCodePattern = /^[0-9][0-9][0-9][0-9][0-9]$/;
  uploadFile: FormGroup;
  fields = ['title', 'surface', 'price', 'durationMax', 'streetNum', 'streetName', 'zipCode',
  'city', 'soilType', 'orientation', 'accessWater', 'accessTools', 'directAccess', 'description', 'pictures'];
  private control: string;
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
      pictures: new FormControl([])
    });
  async ngOnInit() {
    this.uploadFile = new FormGroup({
      profile: new FormControl('')
    });
    if (this.router.url.includes('edit-ad')) {
      this.title = 'MODIFIER VOTRE ANNONCE';
      this.buttonLabel = 'Enregistrer';
      this.action = 'PUT';
      this.confirmationMessage = 'Enregistrer les modifications ?';
      await this.upload.getGardenbyId(sessionStorage.getItem('adToEdit')).toPromise().then(
        // @ts-ignore
        response => this.responsdata = response.data,
        failure => console.log(failure)
      );
      if (this.responsdata.photos) {
        for (const pictures of this.responsdata.photos) {
          this.previewUrls.push(pictures.path);
        }
      }
      this.uploadForm.get('title').setValue(this.responsdata.name);
      this.uploadForm.get('surface').setValue(this.responsdata.criteria.area);
      this.uploadForm.get('price').setValue(this.responsdata.criteria.price);
      this.uploadForm.get('durationMax').setValue(this.responsdata.minUse);
      this.uploadForm.get('address').get('streetName').setValue(this.responsdata.location.street);
      this.uploadForm.get('address').get('zipCode').setValue(this.responsdata.location.postalCode);
      this.uploadForm.get('address').get('city').setValue(this.responsdata.location.city);
      if (this.responsdata.location.streetNumber <= 0) {
        this.uploadForm.get('address').get('streetNum').setValue('');
      } else {
        this.uploadForm.get('address').get('streetNum').setValue(this.responsdata.location.streetNumber);
      }
      if (this.responsdata.criteria.typeOfClay) {
        this.uploadForm.get('soilType').setValue(this.responsdata.criteria.typeOfClay);
      } else {
        this.uploadForm.get('soilType').setValue('');
      }
      if (this.responsdata.criteria.orientation) {
        this.uploadForm.get('orientation').setValue(this.responsdata.criteria.orientation);
      } else {
        this.uploadForm.get('orientation').setValue('');
      }
      if (this.responsdata.criteria.waterAccess) {
        this.uploadForm.get('accessWater').setValue(this.responsdata.criteria.waterAccess);
      } else {
        this.uploadForm.get('accessWater').setValue(false);
      }
      if (this.responsdata.criteria.equipments) {
        this.uploadForm.get('accessTools').setValue(this.responsdata.criteria.equipments);
      } else {
        this.uploadForm.get('accessTools').setValue(false);
      }
      if (this.responsdata.criteria.directAccess) {
        this.uploadForm.get('directAccess').setValue(this.responsdata.criteria.directAccess);
      } else {
        this.uploadForm.get('directAccess').setValue(false);
      }
      if (this.responsdata.description) {
        this.uploadForm.get('description').setValue(this.responsdata.description);
      } else {
        this.uploadForm.get('description').setValue('');
      }
      if (this.responsdata.photos) {
        this.uploadForm.get('pictures').setValue(this.responsdata.photos);
      } else {
        this.uploadForm.get('pictures').setValue([]);
      }
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.uploadedFiles.push(file);
        this.uploadFile.get('profile').setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (pevent) => { // called once readAsDataURL is completed
          // @ts-ignore
          this.previewUrls.push(pevent.target.result);
        };
      }
    }
  }

  removeImage(index) {
    if ( this.action !== 'PUT' ) {
      this.uploadedFiles.splice(index, 1);
    } else {
      this.uploadForm.get('pictures').value.splice(index, 1);
    }
    this.previewUrls.splice(index, 1);
  }

  async onSubmit() {
    // TODO: Replace the following line with an effective one.
    let count = 1;
    for (const file of this.uploadedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      await this.client.post<any>('https://uploadm2.artheriom.fr/upload.php', formData).subscribe(
        (response) => this.uploadForm.get('pictures').value.push(
          {
            fileName: `picture ${count}`,
            path: response[0]
          }),
        (err) => console.log(err)
      ) ;
      count ++;
    }
    if (this.uploadForm.valid) {
      await this.upload.getId().toPromise().then(
        // @ts-ignore
        response => {this.id = response.data.id; console.log(this.uploadForm);
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
            photos: this.uploadForm.get('pictures').value
          };
                     this.confirmPublish();
        },
        failure => {
          if (failure.status === 401) {
            this.showInfo();
          } else { this.showError(); }

        }
      );
    }
  }

  confirmPublish() {
    this.confirmationService.confirm({
      message: this.confirmationMessage,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.action === 'POST') {
          this.upload.postGarden(this.requestBody).subscribe(
            response => {this.showSuccess();
                         for (this.control of this.fields) {
                if (['streetNum', 'streetName', 'zipCode',
                  'city'].includes(this.control)) {
                  this.uploadForm.get('address').get(this.control).setValue(null);
                } else {
                  this.uploadForm.get(this.control).setValue(null);
                }
              }
                         this.uploadedFiles = [];
                         this.previewUrls = [];
                         // @ts-ignore
                         this.router.navigateByUrl(`ad-details/${response.data.id}`);
            },
            () => this.showError()
          );
        } else {
          this.upload.modifyGarden(this.requestBody, sessionStorage.getItem('adToEdit')).subscribe(
            // @ts-ignore
            response => {this.showSuccessEdit(); this.router.navigateByUrl(`ad-details/${response.data.id}`); },
            () => this.showError()
          );
          sessionStorage.removeItem('adToEdit');
        }
      },
      reject: () => {}
    });
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: '', detail: 'Votre annonce a été mise en ligne'});
  }

  showSuccessEdit() {
    this.messageService.add({severity: 'success', summary: '', detail: 'Votre annonce a été modifiée'});
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: '', detail: 'Connectez vous pour publier une annonce'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: '', detail: 'Une erreur est survenue, réessayez plus tard!'});
  }

}
