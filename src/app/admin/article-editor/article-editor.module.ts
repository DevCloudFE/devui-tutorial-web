import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { MarkdownComponent } from './md/md.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MarkdownComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DevUIModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditorComponent
      }
    ])
  ]
})
export class ArticleEditorModule { }
