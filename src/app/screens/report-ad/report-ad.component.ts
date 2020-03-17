import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Report } from "../../@entities/report";
import {ConfirmationService} from 'primeng/api';
import { GardenService } from "../../services/garden/garden.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-report-ad',
  templateUrl: './report-ad.component.html',
  styleUrls: ['./report-ad.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class ReportAdComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private gardenService : GardenService,
    private route : ActivatedRoute, private router : Router, private msgService : MessageService) { }

  async ngOnInit() {
    await this.route.params.subscribe(
      params => this.garden = params['id']
    )
    this.reportForm.get("ofGarden").setValue(this.garden);
  }

  report : Report;

  title : string = "Reclamation";

  garden : string;

  reportForm = new FormGroup({
    reason : new FormControl('', Validators.required),
    ofGarden: new FormControl({value : this.garden, disabled : true }),
    comment : new FormControl('', Validators.required)
  })

  onSubmit(){
    this.confirm();
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Êtes vous sûr de vouloir envoyer la réclamation?',
        accept: () => {
            this.report = {
              id: this.garden,
              comment: this.reportForm.get("comment").value,
              ofGarden: this.garden,
              reason : this.reportForm.get("reason").value
            };
            this.gardenService.sendReport(this.report).subscribe(
              () => {}
            );
            this.msgService.add({severity:'info', detail:'Votre réclamation a été envoyée, vous serez redirigé vers l\'annonce'});
            setTimeout( () => {this.router.navigate(['']); }, 2000);
        }
    });
}

}
