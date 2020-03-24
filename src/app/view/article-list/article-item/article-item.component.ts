import { Component, OnInit, Input } from '@angular/core';
import * as marked from 'marked';
@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  article;
  @Input() set data(data) {
    this.article = data;
    const htmlContent = marked(this.article['content'], {
      breaks: true
    });
    this.article['content'] = htmlContent.replace(/<.*?>/g, '').substring(0, 100) + '...';
  }
  get data() {
    return this.article;
  }
  constructor() { }

  ngOnInit() {
  }

}
