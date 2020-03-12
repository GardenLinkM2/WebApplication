import { Component, OnInit } from '@angular/core';
import { Wallet } from '../../@entities/wallet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../services/user-info/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fill-wallet',
  templateUrl: './fill-wallet.component.html',
  styleUrls: ['./fill-wallet.component.scss'],
  providers: [
    ConfirmationService
  ]
})
export class FillWalletComponent implements OnInit {


  constructor(private confirmationService: ConfirmationService, private userService: UserService, private router: Router) { }

  wallet: Wallet = {
    id : null,
    amount: null
  };

  fillForm = new FormGroup({
    amount : new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
      Validators.min(1),
      Validators.max(4999999999)
    ])
  });

  async ngOnInit() {
    await this.userService.getUserWallet().toPromise().then(
      response => {
        // @ts-ignore
        this.wallet.id = response.data.id;
        // @ts-ignore
        this.wallet.amount = response.data.balance;
        console.log(this.wallet);
      },
      error => {
        console.error('No response');
      }
    );
  }

  onSubmit() {
    this.confirm();
  }

  abort() {
    this.router.navigateByUrl('personal-space/user-info');
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            console.warn(this.fillForm.value);
            this.userService.fillWallet(this.wallet.id, this.fillForm.get('amount').value + this.wallet.amount).subscribe(
              () => this.router.navigateByUrl('personal-space/user-info')
            );
        }
    });
}

}
