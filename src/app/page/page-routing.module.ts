import { ContentstackComponent } from './contentstack/contentstack.component';
import { PiranhacmsComponent } from './piranhacms/piranhacms.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'piranha' ,
    component: PiranhacmsComponent
  },
  {
    path: 'content',
    component: ContentstackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
