import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DialogService, DataTableComponent } from 'ng-devui';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit , OnDestroy {
  @ViewChild(DataTableComponent, {static: false}) dataTable: DataTableComponent;
  showFilterPanel = false;
  subscription: Subscription;
  activeListType: string;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  articleList = [];
  filterOption;
  keyword = '';
  checkRows;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private dialogService: DialogService) { }



  ngOnInit() {
    this.activeListType = this.getActiveListType(this.route.snapshot);
    this.getData();

  }
  getData() {
    const condition = Object.assign({keyword: this.keyword}, this.showFilterPanel ? this.filterOption : {});
    this.http.post(`/api/articles/query/${this.activeListType}`, condition , {params: {
      page: this.pageIndex + '',
      size: this.pageSize + ''
    }} ).subscribe(res => {
      this.articleList = res['articles'];
      this.total = res['total'];
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  toggleFilterPenal() {
    this.showFilterPanel = !this.showFilterPanel;
  }
  navigateTo(url) {
    this.router.navigateByUrl(url);
  }
  getActiveListType(routeSnap: ActivatedRouteSnapshot) {
    let activeListType = 'published';
    if (routeSnap.url) {
      activeListType = routeSnap.url && routeSnap.url[0].path;
    }
    return activeListType;
  }
  pageIndexChange(event) {
    this.pageIndex = event;
    this.getData();
  }
  pageSizeChange(event) {
    this.pageIndex = 1;
    this.pageSize = event;
    this.getData();
  }

  view(id) {
    this.navigateTo('/articles/' + id);
  }
  edit(id) {
    this.navigateTo('/admin/articles/edit/' + id);
  }
  publish(id) {
    this.moveToPublished([id]);
  }



  moveToTrash = (ids, callback?) => {
    this.http.put(`/api/articles/trash`, {ids}).subscribe(
      res => {
        if (callback) {callback(); }
      }
    );
  }
  moveToPublished = (ids, callback?) => {
    this.http.put(`/api/articles/published`, {ids}).subscribe(res => {
      if (callback) {callback(); }
    });
  }
  deleteArticleMany =  (ids, callback?) => {
    this.http.post(`/api/articles/batchDelete`, {ids}).subscribe(
      res => {
        if (callback) {callback(); }
      }
    );
  }

  deleteArticle = (ids, callback?) => {
    const id = ids[0];
    this.http.delete(`/api/articles/${id}`).subscribe(
      res => {
        if (callback) {callback(); }
      }
    );
  }
  onSearch() {
    this.getData();
  }
  onFilter(event) {
    this.filterOption = event;
    this.getData();
  }

  delete(ids, batch= false) {
    let tips;
    let deleteArticle;
    switch (this.activeListType) {
      case 'trash':
        tips = '确认是否永久删除文章';
        deleteArticle = this.deleteArticle;
        if (batch) {
          deleteArticle = this.deleteArticleMany;
        }
        break;
      case 'published':
      case 'draft':
        tips = '确认是否删除文章';
        deleteArticle = this.moveToTrash;
        break;
      default:
    }

    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '400px',
      maxHeight: '600px',
      showAnimate: false,
      title: '',
      html: true,
      content: `<div style="color:#8a6d3b;">${tips}</div>`,
      backdropCloseable: true,
      dialogtype: 'warning',
      buttons: [
        {
          cssClass: 'stress',
          text: '删除',
          handler: ($event: Event) => {
            results.modalInstance.hide();
            deleteArticle(ids, () => {
              this.getData();
            });
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          }
        }],
      });
  }
  batchDelete() {
    this.checkRows = this.dataTable.getCheckedRows();
    if (!this.checkRows || !this.checkRows.length) { return; }
    const ids = this.checkRows.map(row => row.id);
    this.delete(ids, true);
  }
}
