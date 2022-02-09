import { ContentstackComponent } from './contentstack/contentstack.component';
import { PiranhacmsComponent } from './piranhacms/piranhacms.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrchardcmsComponent } from './orchardcms/orchardcms.component';

const routes: Routes = [
  {
    path: 'piranha' ,
    component: PiranhacmsComponent
  },
  {
    path: 'content',
    component: ContentstackComponent
  },
  {
    path: 'orchard',
    component: OrchardcmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
