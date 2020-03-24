import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.css']
})
export class ArticleManagementComponent implements OnInit, OnDestroy {
  activeTab;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
    this.activeTab = this.getActiveTab(this.route.snapshot);
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.activeTab = this.getActiveTab(this.route.snapshot);
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getActiveTab(routeSnap: ActivatedRouteSnapshot) {
    let activeTab;
    if (routeSnap.firstChild && routeSnap.firstChild.url) {
      activeTab = routeSnap.firstChild.url && routeSnap.firstChild.url[0].path;
    }
    return activeTab;
  }
  activeTabChange(event) {
    this.router.navigate(['../', event], {relativeTo: this.route.firstChild} );
  }
}
