import { Component, OnInit } from '@angular/core';
import { Leasing } from 'src/app/@entities/leasing';
import { LeasingService } from "../../services/leasing/leasing.service";
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-treat-demands',
  templateUrl: './treat-demands.component.html',
  styleUrls: ['./treat-demands.component.scss'],
  providers : [
    MessageService
  ]
})
export class TreatDemandsComponent implements OnInit {

  constructor(private msgService : MessageService, private leasingS : LeasingService) { }

  async ngOnInit() {

    this.showProgressSpinner();

    await this.leasingS.getUserMe().toPromise().then(
      response => {
        this.myId = response["data"].id;
      }
    )

    await this.leasingS.getDemands(this.myId).subscribe(
      Response => {
        this.demands = Response;
      }
    )

    this.showMessage();
  }

  myId : string;
  demands : Leasing [];
  title = "Demandes reçues";
  spin: boolean = true;

  showProgressSpinner() {
    setTimeout(() => {
      this.spin = false;
    }, 1500);
  }

  onTreated(event : any){
    this.demands.splice(this.demands.findIndex(l => l.id == event.id), 1);
    if(!this.demands || this.demands.length == 0) {
      setTimeout(() => {
        this.writeMessage(event.action, event.user);
        this.showMessage();
      } , 1000);
    }
    else 
      setTimeout(() => this.writeMessage(event.action, event.user), 1000);
  }

  writeMessage(action : string, user : string) {
    if(action === "accept")
      this.msgService.add({severity: 'success', summary: 'OK ',detail: 'Vous avez accepté la demande de ' + user + '.'});
    else if(action === "refuse")
      this.msgService.add({severity: 'error', summary: 'OK', detail: 'Vous avez refusé la demande de ' + user + '.'});
  }

  showMessage() {
    this.msgService.add({severity: 'info', detail: 'Vous n\'avez aucune demande non traitée.'});
  }

}
