import { ModalService } from './../../services/modal-service/modal.service';
import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GardensService} from '../../services/gardens/gardens.service';
import {UserService} from '../../services/user-info/user.service';
import {User} from '../../@entities/user';
import {LeasingService} from '../../services/leasing/leasing.service';
import {Leasing} from '../../@entities/leasing';
import {ConfirmationService} from 'primeng/api';
import {Subject} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ILocalStorage} from '../../@entities/i-local-storage';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-ad-details-screen',
  templateUrl: './ad-details-screen.component.html',
  styleUrls: ['./ad-details-screen.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class AdDetailsScreenComponent implements OnInit {
  ad: Garden;
  owner: User;
  otherAds: Garden[];
  isMine = false;
  isMeDemandingLeasing = false;
  isLeasingAccepted = false;
  leasing: Leasing;
  isConnected = false;
  displayModal: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private gardensService: GardensService,
              private router: Router,
              private userService: UserService,
              private leasingService: LeasingService,
              private confirmationService: ConfirmationService,
              private localStorageService: LocalStorageService,
              private modal: ModalService,
              private messageS: MessageService) {
  }

  ngOnInit() {
    this.init();
    this.localStorageService.watchStorage().subscribe((next: ILocalStorage) => {
      if (!next.key.localeCompare('id')) {
        this.init();
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });

    this.modal.currentModalState.subscribe(display => this.displayModal = display);

  }

  showModalDialog() {
    if (localStorage.getItem('synToken') !== null) {
      this.router.navigateByUrl('/demande-location/' + this.ad.id);
    } else {
      this.modal.showModalDialog();
    }
  }

  getInterestingGarden() {
    this.gardensService.getGardens().subscribe((result: { data: Garden[]; count: number; }) => {
      if (result && result.data) {
        const max = result.count > 5 ? 5 : result.count;
        this.otherAds = result.data.slice(0, max);
      } else {
        this.otherAds = [];
      }
    });
  }

  getOwner(userId) {
    this.userService.getUserById(userId).subscribe((result: User) => {
      this.owner = result;
      this.getUsersLeasing();
    });
  }

  getUsersLeasing() {
    if (this.isConnected) {
      this.leasingService.getUserLeasings().subscribe((result: { data: Leasing[], count: number }) => {
        if (result.data) {
          this.isMeDemandingLeasing = false;
          this.leasing = undefined;
          result.data.forEach(leas => {
            if (!localStorage.getItem('id').localeCompare(leas.renter) && !this.ad.id.localeCompare(leas.garden) && !this.isMine) {
              this.leasing = leas;
              this.isMeDemandingLeasing = !leas.state.localeCompare('InDemand');
              this.isLeasingAccepted = !leas.state.localeCompare('InProgress');
            }
          });
        }
      });
    }
  }

  delete() {
    this.gardensService.deleteById(this.ad.id).subscribe(
      Response => {  
        this.router.navigateByUrl('/personal-space/my-gardens');
      },
      error => {
        if(error.error.message == "Impossible to delete a garden with current leasings.") {
          this.messageS.add({severity:'error', detail:'Impossible de supprimer un jardin qui a une location en cours.'});
        };
      });
  }

  onModify() {
    sessionStorage.setItem('adToEdit', this.ad.id);
    this.router.navigateByUrl('/modifier-annonce');
  }

  onDelete() {
    this.confirmationService.confirm({
      header: 'Confirmation de suppression',
      message: 'Êtes-vous sur de vouloir supprimer l\'annonce ?',
      accept: () => {
        this.delete();
      }
    });
  }

  init() {
    if (localStorage.getItem('synToken')) {
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.gardensService.getGardenById(this.activatedRoute.snapshot.params.id).subscribe((result: { data: Garden; }) => {
        if (result.data) {
          this.ad = result.data;
          this.isMine = false;
          if (!this.ad.owner.localeCompare(localStorage.getItem('id'))) {
            this.isMine = true;
          }
          this.getOwner(this.ad.owner);
        } else {
          this.router.navigateByUrl('/');
        }
      });
    } else {
      this.router.navigateByUrl('/');
    }
    this.getInterestingGarden();
  }

  onCancelDemandOfLeasing() {
    this.confirmationService.confirm({
      header: 'Annuler demande',
      message: 'Êtes-vous sur de vouloir retirer votre demande ?',
      accept: () => {
        this.cancelDemandOfLeasing();
      }
    });
  }

  cancelDemandOfLeasing() {
    if (this.leasing) {
      this.leasingService.deleteLeasingById(this.leasing.id).subscribe(result => {
        this.isMeDemandingLeasing = false;
        this.leasing = undefined;
      });
    }
  }
}
