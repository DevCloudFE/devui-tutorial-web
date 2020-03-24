import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagementComponent } from './article-management.component';
import { ArticleListComponent } from './article-list/article-list.component';


const routes: Routes = [{
  path: '',
  component: ArticleManagementComponent,
  children: [
    {
      path: '',
      redirectTo: 'published',
    },
    {
      path: 'published',
      component: ArticleListComponent,
    },
    {
      path: 'draft',
      component: ArticleListComponent,
    },
    {
      path: 'trash',
      component: ArticleListComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleManagementRoutingModule { }
