import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  layout;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.layout = this.extraLayoutData(this.route.snapshot);
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.layout = this.extraLayoutData(this.route.snapshot);
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  extraLayoutData(routeSnap: ActivatedRouteSnapshot) {
    let layout;
    if (routeSnap.firstChild && routeSnap.firstChild.data && routeSnap.firstChild.data.layout) {
      layout = routeSnap.firstChild.data.layout;
    } else if (routeSnap.data && routeSnap.data.layout) {
      layout =  routeSnap.data.layout;
    }
    return layout;
  }
}
