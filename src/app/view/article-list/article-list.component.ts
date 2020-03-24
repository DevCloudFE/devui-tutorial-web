import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList = [];
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchArticleList();
  }

  pageIndexChange(event) {
    this.pageIndex = event;
    this.fetchArticleList();
  }

  fetchArticleList() {
    this.http.get('/api/articles?page=' + this.pageIndex + '&size=' + this.pageSize).subscribe(res => {
      this.articleList = res['articles'];
      this.total = res['total'];
    });
  }
}
