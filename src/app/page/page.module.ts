import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PiranhacmsComponent } from './piranhacms/piranhacms.component';
import { ContentstackComponent } from './contentstack/contentstack.component';
import { OrchardcmsComponent } from './orchardcms/orchardcms.component';

@NgModule({
  declarations: [
    PiranhacmsComponent,
    ContentstackComponent,
    OrchardcmsComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
  ]
})
export class PageModule { }
