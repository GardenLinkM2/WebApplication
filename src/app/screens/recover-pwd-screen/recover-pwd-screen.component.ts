import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecoverPwdService} from '../../services/password-recovery/recover-pwd.service';
import {ActivatedRoute} from '@angular/router';
import {comparisonValidator} from '../../services/validators/cofirm-password';

@Component({
  selector: 'app-recover-pwd-screen',
  templateUrl: './recover-pwd-screen.component.html',
  styleUrls: ['./recover-pwd-screen.component.scss']
})
export class RecoverPwdScreenComponent {
  submitted: boolean;
  responseStatus: string;
  rcvPassForm = new FormGroup(
    {password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])}
  );
    constructor(private reinitpass: RecoverPwdService, private activatedRoute: ActivatedRoute) {
      this.submitted = false;
      this.rcvPassForm.setValidators(comparisonValidator());
    }
  onSubmit() {
    // TODO: Replace the following line with an effective one.
    if (this.rcvPassForm.valid) {
      this.reinitpass.reinitpass(this.rcvPassForm, this.activatedRoute.snapshot.params.token).subscribe(
        response => this.responseStatus = 'success',
        error => {console.log('Error code', error.code); this.responseStatus = 'failure'; }
      );
      this.submitted = true;
    }
  }

}
