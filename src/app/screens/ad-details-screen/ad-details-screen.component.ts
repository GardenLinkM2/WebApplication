import {Component, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {ActivatedRoute, Router} from '@angular/router';
import {GardensService} from '../../services/gardens/gardens.service';
import {UserService} from '../../services/user-info/user.service';
import {User} from '../../@entities/user';

@Component({
  selector: 'app-ad-details-screen',
  templateUrl: './ad-details-screen.component.html',
  styleUrls: ['./ad-details-screen.component.scss']
})
export class AdDetailsScreenComponent implements OnInit {
  ad: Garden;
  owner: User;
  images: any[];
  imageIndex = 0;
  otherAds: Garden[];

  constructor(private activatedRoute: ActivatedRoute,
              private gardensService: GardensService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.id) {
      this.gardensService.getGardenById(this.activatedRoute.snapshot.params.id).subscribe((result: {data: Garden; }) => {
        if (result.data) {
          this.ad  = result.data;
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
      console.log(result)
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

}
