import { Component, Input, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-outline',
  templateUrl: './article-outline.component.html',
  styleUrls: ['./article-outline.component.css']
})
export class ArticleOutlineComponent implements OnDestroy {
  @Input() width = '200px';
  @Input() scrollContainer: HTMLElement;
  private initArticleDom: HTMLElement;
  @Input() set articleDom(articleDom) {
    this.initArticleDom = articleDom;
    this.initOutline();
  }
  get articleDom() {
    return this.initArticleDom;
  }
  activeIndex = 0;
  outlineData = [];
  manualScroll = false;
  scrollSub: Subscription;
  constructor(private el: ElementRef) { }

  initOutline() {
    this.outlineData = [];
    if (this.articleDom) {
      const articleOutLines = Array.from(this.articleDom.querySelectorAll('h1,h2'));
      articleOutLines.forEach(item =>
        this.outlineData.push({ dom: item, text: item.textContent, flag: item.tagName.toLocaleLowerCase()})
      );

      this.scrollSub = fromEvent(this.scrollContainer, 'scroll').pipe(throttleTime(100)).subscribe(() => {
        if (!this.manualScroll) {
          const target = this.scrollContainer.scrollTop;
          const topData = this.outlineData.map((item, index) => {
            return {top: item.dom.getBoundingClientRect().top, order: index};
          });
          topData.sort((a, b) => Math.abs(a.top - target) - Math.abs(b.top - target));
          this.activeIndex = topData[0].order;
          const doms = this.el.nativeElement.querySelectorAll('.item-content');
          if (doms[this.activeIndex]) {
            doms[this.activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          }
        }
      });
    }
  }

  scrollToView(index) {
    this.manualScroll = true;
    this.activeIndex = index;
    this.outlineData[index].dom.scrollIntoView({ block: 'start',  behavior: 'smooth', inline: 'nearest' });
    // scrollIntoView 暂未提供callback https://github.com/w3c/csswg-drafts/issues/3744，简单处理一下，建议自己实现一个scroll to position方法
    setTimeout(() => {
      this.manualScroll = false;
    }, 2000);
  }

  ngOnDestroy(): void {
   if (this.scrollSub) {
     this.scrollSub.unsubscribe();
   }
  }
}
