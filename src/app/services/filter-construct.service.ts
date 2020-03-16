import {Injectable} from '@angular/core';
import {Orientation} from '../@entities/enum/orientation.enum';
import {GroundEnum} from '../@entities/enum/ground.enum';

class SearchForm {
  freeTextArea: string;
  price: number;
  surface: number;
  duration: number;
  waterAccess: boolean;
  outilsAccess: boolean;
  directGardenAccess: boolean;
  groundSel: GroundEnum;
  orientationSel: Orientation;
  cityText: string;
  postalCode: number;
  streetNum: number;
  street: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterConstructService {

  constructor() {
  }

  private constructFilter(formData: SearchForm): string[] {
    const result = [];
    if (formData.freeTextArea) {
      result.push('(contains(tolower(name),  \'' + formData.freeTextArea.toLocaleLowerCase() + '\') or contains(tolower(description),  \'' + formData.freeTextArea.toLocaleLowerCase() + '\'))');
    }
    if (formData.price) {
      result.push('criteria/price ge 0.0 and criteria/price le ' + formData.price + '.00');
    }
    if (formData.surface) {
      result.push('criteria/area ge 0.0 and criteria/area le ' + formData.surface + '.00');
    }
    if (formData.duration) {
      result.push('minUse ge 0 and minUse le ' + formData.duration);
    }
    if (formData.waterAccess) {
      result.push('criteria/waterAccess eq true');
    }
    if (formData.outilsAccess) {
      result.push('criteria/equipments eq true');
    }
    if (formData.directGardenAccess) {
      result.push('criteria/directAccess eq true');
    }
    if (formData.groundSel) {
      result.push('criteria/typeOfClay eq \'' + formData.groundSel + '\'');
    }
    if (formData.orientationSel) {
      result.push('criteria/orientation eq \'' + formData.orientationSel + '\'');
    }
    if (formData.streetNum) {
      result.push('location/streetNumber eq ' + formData.streetNum);
    }
    if (formData.street && (formData.street.trim().length > 0)) {
      result.push('location/street eq \'' + formData.street + '\'');
    }
    if (formData.cityText && (formData.cityText.trim().length > 0)) {
      result.push('location/city eq \'' + formData.cityText + '\'');
    }
    if (formData.postalCode) {
      result.push('location/postalCode eq ' + formData.postalCode);
    }
    return result;
  }

  constructUrl(formData: SearchForm) {
    const filters: string[] = this.constructFilter(formData);
    if (filters.length <= 0) {
      return '';
    }
    let result = '?$filter=';
    filters.forEach(filter => {
      result = result + ' ' + filter + ' and';
    });
    result = result.substring(0, result.length - 4);
    console.log(result);
    return result;
  }
}
