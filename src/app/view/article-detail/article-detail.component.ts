import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as marked from 'marked';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleDom: HTMLElement;
  scrollContainer: HTMLElement;
  title = '';
  htmlContent = '';
  tags = [];
  prePageId;
  nextPageId;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.articleDom = null;
      this.http.get('/api/articles/' + id).subscribe(res => {
        const article = res['article'];
        this.title = article['title'];
        this.tags = article['tags'];
        const content = article['content'];
        this.prePageId = res['prePageId'];
        this.nextPageId = res['nextPageId'];
        this.htmlContent = marked(content, {
          breaks: true
        });
        setTimeout(() => {
          this.articleDom = document.querySelector('.devui-article-container .article-content');
        });
      });
    });
    this.scrollContainer = document.querySelector('.devui-article-container');
  }

  goPage(pageId) {
    this.router.navigate(['/articles', pageId]);
  }
}
