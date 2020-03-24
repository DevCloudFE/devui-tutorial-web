import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DevUIModule } from 'ng-devui';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleOutlineComponent } from './article-outline/article-outline.component';



@NgModule({
  declarations: [
    ArticleDetailComponent,
    ArticleOutlineComponent
  ],
  imports: [
    CommonModule,
    DevUIModule,
    ArticleDetailRoutingModule
  ]
})
export class ArticleDetailModule { }
