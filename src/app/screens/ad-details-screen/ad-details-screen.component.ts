import {Component, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {ActivatedRoute, Router} from '@angular/router';
import {GardensService} from '../../services/gardens/gardens.service';
import {UserService} from '../../services/user-info/user.service';
import {User} from '../../@entities/user';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-ad-details-screen',
  templateUrl: './ad-details-screen.component.html',
  styleUrls: ['./ad-details-screen.component.scss']
})
export class AdDetailsScreenComponent implements OnInit {
  ad: Garden;
  owner: User;
  otherAds: Garden[];
  isMine = false;

  constructor(private activatedRoute: ActivatedRoute,
              private gardensService: GardensService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    // TODO: changer l'annonce si id change
    if (this.activatedRoute.snapshot.params.id) {
      this.gardensService.getGardenById(this.activatedRoute.snapshot.params.id).subscribe((result: { data: Garden; }) => {
        if (result.data) {
          this.ad = result.data;

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
    });
  }

  delete() {
    this.gardensService.deleteById(this.ad.id).subscribe(() => {
      this.router.navigateByUrl('/acceuil');
    });
  }

  onModify() {
    sessionStorage.setItem('adToEdit', this.ad.id);
    this.router.navigateByUrl('/edit-ad');
  }

  onRent() {

  }

  onDelete() {
  }

}
