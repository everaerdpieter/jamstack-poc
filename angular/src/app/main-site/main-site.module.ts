import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MainSiteRoutingModule } from './main-site-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MarkdownModule.forChild(), MainSiteRoutingModule],
})
export class MainSiteModule {}
