import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-md-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {
  initContent: string;
  currentContent: string;
  title = '';
  currentId = '';
  createTime = '';
  status = '';
  showEditor = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private location: Location) {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentId = params.id;
      if (this.currentId) {
        this.http.get('/api/articles/' + this.currentId).subscribe(res => {
          const article = res['article'];
          this.initContent = article['draftContent'] || article['content'];
          this.title = article['title'];
          this.createTime = article['createTime'];
          this.status = article['status'];
          this.showEditor = true;
        });
      } else {
        this.showEditor = true;
      }
    });
  }

  contentChange(data) {
    this.currentContent = data;
  }

  postDoc(draft = false) {
    if (this.currentId) {
      const article = {
        id: this.currentId,
        title: this.title,
        tags: ['DevUI', '前端'],
        content: draft ? this.initContent : this.currentContent,
        draftContent:  draft ? this.currentContent : undefined,
        createTime: this.createTime,
        status: this.newStatus(draft)
      };
      this.http.put('/api/articles', article).subscribe( res => {
        this.router.navigate(draft ? ['/admin/articles/draft'] : ['/admin/articles']);
      });
    } else {
      const article = {
        title: this.title,
        tags: ['DevUI', '前端'],
        content: this.currentContent,
        status: this.newStatus(draft)
      };
      this.http.post('/api/articles', article).subscribe( res => {
        this.router.navigate(draft ? ['/admin/articles/draft'] : ['/admin/articles']);
      });
    }
  }

  newStatus(draft) {
    if (this.status === 'published') {
      return draft ? 'published-draft' : 'published';
    } else {
      return draft ? 'draft' : 'published';
    }
  }

  cancelPost() {
    // chrome默认状态下history有两条记录
    if (window.history.length > 2) {
        this.location.back();
    } else {
        this.router.navigate(['/admin/articles']);
    }
  }
}
