import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MdpService} from './mdp.service';

@Component({
  selector: 'app-mpd-oublie',
  templateUrl: './mdp-oublie.component.html',
  styleUrls: ['./mdp-oublie.component.scss']
})
export class MdpOublieComponent {

  submitted: boolean;
  constructor(private recover: MdpService) { this.submitted = false; }
  fgtPassForm = new FormGroup(
    {emailControl: new FormControl('', [Validators.email, Validators.required])}
  );
  onSubmit() {
    // TODO: Replace the following line with an effective one.
    if (this.fgtPassForm.valid) {
      this.recover.recover(this.fgtPassForm).subscribe(
        data => console.log('success ', data),
        fail => console.log('error', fail)
      );
      this.submitted = true;
    }
  }


}
