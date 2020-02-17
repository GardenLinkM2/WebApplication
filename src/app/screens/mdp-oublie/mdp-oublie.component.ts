import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mpd-oublie',
  templateUrl: './mdp-oublie.component.html',
  styleUrls: ['./mdp-oublie.component.scss']
})
export class MdpOublieComponent {

  constructor() { }
  fgtPassForm = new FormGroup(
    {emailControl: new FormControl('', [Validators.email, Validators.required])}
  );
  emailValidator(control) {
    if (control.value) {
      const matches = control.value.match();

      return matches ? null : {invalidEmail: true};
    } else {
      return null;
    }
  }
  onSubmit() {
    // TODO: Replace the following line with an effective one.
    console.warn(this.fgtPassForm.value);
  }


}
