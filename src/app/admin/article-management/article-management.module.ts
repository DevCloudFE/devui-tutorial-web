import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleManagementRoutingModule } from './article-management-routing.module';
import { ArticleManagementComponent } from './article-management.component';
import { DevUIModule } from 'ng-devui';
import { ArticleListComponent } from './article-list/article-list.component';
import { FormsModule } from '@angular/forms';
import { ArticleFilterPanelComponent } from './article-filter-panel/article-filter-panel.component';


@NgModule({
  declarations: [ArticleManagementComponent, ArticleListComponent, ArticleFilterPanelComponent],
  imports: [
    CommonModule,
    ArticleManagementRoutingModule,
    FormsModule,
    DevUIModule,
  ],
  entryComponents: [ArticleListComponent]
})
export class ArticleManagementModule { }
