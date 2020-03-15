import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../services/upload-add/upload.service';
import {Orientation} from '../../@entities/enum/orientation.enum';
import {GroundEnum} from '../../@entities/enum/ground.enum';
import {UploadAdBody} from '../../@entities/adUploadBody';
import {ConfirmationService, Message} from 'primeng/api';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BackgroundService} from "../../services/backgroud-service/background.service";

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
export class UploadScreenComponent implements OnInit, AfterViewInit {
  soils: Soil[];
  uploadedFiles: any[] = [];
  directions: Direction[];
  message: string;
  MAX_FILES = 5;
  private requestBody: UploadAdBody;
  private id: string;
  private previewUrls = [];
  constructor(private backgroundService: BackgroundService, private elementRef: ElementRef, private client: HttpClient, private upload: UploadService, private confirmationService: ConfirmationService, private router: Router) {
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
  displayUpload = false;
  uploadFile: FormGroup;
  fields = ['title', 'surface', 'price', 'durationMax', 'streetNum', 'streetName', 'zipCode',
  'city', 'soilType', 'orientation', 'accessWater', 'accessTools', 'directAccess', 'description', 'pictures'];
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
    }
  );
  private control: string;

  ngOnInit(): void {
    this.uploadFile = new FormGroup({
      profile: new FormControl('')});
  }

  ngAfterViewInit() {
    this.backgroundService.enableBackGround(this.elementRef);
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
          this.previewUrls.splice(index, 1);
          this.uploadedFiles.splice(index, 1);
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
        response => {this.id = response.data.id;
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
        error => {
          if (error.status === 401) {
            this.message = 'Connectez vous pour publier une annonce';
          } else { this.message = 'Une erreur est survenue, réessayez plus tard!'; }
          this.displayUpload = true;
        }
      );
    }
  }

  confirmPublish() {
    this.confirmationService.confirm({
      message: 'Souhaitez vous publier le bien?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.upload.postGarden(this.requestBody).subscribe(
          () => {this.message = 'Votre annonce a été mise en ligne'; this.displayUpload = true;
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
            },
          () => {this.message = 'Une erreur est survenue, réessayez plus tard!'; this.displayUpload = true; }
        );
      },
      reject: () => {}
    });
  }

}
