import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecoverPwdService} from './recover-pwd.service';

@Component({
  selector: 'app-recover-pwd-screen',
  templateUrl: './recover-pwd-screen.component.html',
  styleUrls: ['./recover-pwd-screen.component.scss']
})
export class RecoverPwdScreenComponent {

  submitted: boolean;
  responseStatus: number;
  constructor(private reinitpass: RecoverPwdService) { this.submitted = false; }
  rcvPassForm = new FormGroup(
    {password: new FormControl('', [Validators.required])}
  );
  onSubmit() {
    // TODO: Replace the following line with an effective one.
    if (this.rcvPassForm.valid) {
      this.reinitpass.reinitpass(this.rcvPassForm).subscribe(
        response => {console.log('Response code', response.status); },
        error => {console.log('Error code', error.status);
                  this.responseStatus = error.status; }
      );
      this.submitted = true;
    }
  }

}
