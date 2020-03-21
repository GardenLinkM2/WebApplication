import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GroundEnum} from '../../@entities/enum/ground.enum';
import {Orientation} from '../../@entities/enum/orientation.enum';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {

  isFilterActivated = false;

  searchForm: FormGroup;

  groundTypes: Array<[string, string]>;
  orientationTypes: Array<[string, string]>;

  @Output() searchEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      freeTextArea: ['', Validators.maxLength(255)],
      price: [undefined, [Validators.min(0), Validators.max(10000)]],
      surface: [undefined, [Validators.min(0), Validators.max(10000)]],
      duration: [undefined, [Validators.min(0), Validators.max(36)]],
      waterAccess: undefined,
      outilsAccess: undefined,
      directGardenAccess: undefined,
      groundSel: undefined,
      orientationSel: undefined,
      cityText: [undefined, Validators.maxLength(255)],
      postalCode: [undefined, [Validators.min(0), Validators.max(99999), Validators.pattern('^[0-9][0-9][0-9][0-9][0-9]$')]],
      streetNum: undefined,
      street: [undefined, [Validators.maxLength(255), Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.groundTypes = new Array<[string, string]>();
    Object.keys(GroundEnum).forEach(key => {
      this.groundTypes.push([key, GroundEnum[key]]);
    });
    this.orientationTypes = new Array<[string, string]>();
    Object.keys(Orientation).forEach(key => {
      this.orientationTypes.push([key, Orientation[key]]);
    });
  }

  onSubmit(value: FormGroup) {
    this.searchEventEmitter.emit(value);
  }

  onCancel(controlName: string) {
    this.searchForm.get(controlName).reset();
  }
}
