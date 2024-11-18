import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent, // Solo PagesComponent
  ],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
