import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArticleListRoutingModule } from './article-list-routing.module';
import { ArticleListComponent } from './article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { PaginationModule, TagsModule } from 'ng-devui';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [ArticleListComponent, ArticleItemComponent, SidebarComponent],
  imports: [
    CommonModule,
    ArticleListRoutingModule,
    RouterModule,
    PaginationModule,
    TagsModule
  ]
})
export class ArticleListModule { }
