import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFilterPanelComponent } from './article-filter-panel.component';

describe('ArticleFilterPanelComponent', () => {
  let component: ArticleFilterPanelComponent;
  let fixture: ComponentFixture<ArticleFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
