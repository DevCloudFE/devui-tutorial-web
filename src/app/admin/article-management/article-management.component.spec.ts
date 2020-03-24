import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagementComponent } from './article-management.component';

describe('ArticleManagementComponent', () => {
  let component: ArticleManagementComponent;
  let fixture: ComponentFixture<ArticleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
