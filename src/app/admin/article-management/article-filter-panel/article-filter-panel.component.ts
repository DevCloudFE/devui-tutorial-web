import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-article-filter-panel',
  templateUrl: './article-filter-panel.component.html',
  styleUrls: ['./article-filter-panel.component.css']
})
export class ArticleFilterPanelComponent implements OnInit {
  tagList = ['DevUI', '前端'];
  filterOption = {
    tags: [],
    date: [null, null]
  };
  startDate = null;
  endDate = null;
  @Output() condition = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  updateCondition() {
    this.condition.emit(this.filterOption);
  }
  handleStartDate(event: Date) {
    this.filterOption.date[0] = +event;
  }
  handleEndDate(event: Date) {
    this.filterOption.date[1] = +(event.setDate(event.getDate() + 1));
  }
  reset() {
    this.startDate = null;
    this.endDate = null;
    this.filterOption  = {
      tags: [],
      date: [null, null]
    };
  }
}
