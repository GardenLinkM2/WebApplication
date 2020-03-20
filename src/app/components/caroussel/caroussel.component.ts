import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Photo} from '../../@entities/photo';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss']
})
export class CarousselComponent implements OnInit, OnChanges {

  @Input() images: Photo[];
  selectedImage: Photo;
  constructor() { }

  ngOnInit() {
    if (this.images) {
      this.selectedImage = this.images[0];
    } else {
      this.selectedImage = {fileName: 'default garden', path: '../../../assets/img/default-garden.png', id: undefined};
    }
  }

  onChangeSelectedImage(index) {
    this.selectedImage = this.images[index];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

}
