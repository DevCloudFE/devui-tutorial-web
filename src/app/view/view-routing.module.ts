import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'articles'
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('./article-list/article-list.module').then(
            m => m.ArticleListModule
          )
      },
      {
        path: 'articles/:id',
        loadChildren: () =>
          import('./article-detail/article-detail.module').then(
            m => m.ArticleDetailModule
          )
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {}
