import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {  AuthGuard } from '../login/auth.guard';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'articles',
      loadChildren: () => import('./article-management/article-management.module').then(m => m.ArticleManagementModule),
      data: {
        layout: {occupy: 'content'},
      }
    },
    {
      path: 'articles/new',
      loadChildren: () => import('./article-editor/article-editor.module').then(m => m.ArticleEditorModule),
      data: {
        layout: {occupy: 'main'},
      }
    },
    {
      path: 'articles/edit/:id',
      loadChildren: () => import('./article-editor/article-editor.module').then(m => m.ArticleEditorModule),
      data: {
        layout: {occupy: 'main'},
      }
    },
  ],
},
{
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
