import {Component, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
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

  // TODO: refresh comments refresh map, si types non reseigné l'afficher
  constructor(private activatedRoute: ActivatedRoute,
              private gardensService: GardensService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.init();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });

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

  onDelete() {
  }

  init() {
    if (this.activatedRoute.snapshot.params.id) {
      this.gardensService.getGardenById(this.activatedRoute.snapshot.params.id).subscribe((result: { data: Garden; }) => {
        console.log(result)
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
}
