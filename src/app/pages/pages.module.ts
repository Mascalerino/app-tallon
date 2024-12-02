import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PAGES_ROUTE } from './pages.routing';

const PROJECT_MODULES = [SharedModule, PagesComponent];
const ANGULAR_MODULES = [CommonModule, FormsModule];
@NgModule({
  declarations: [PagesComponent],
  exports: [PagesComponent],
  imports: [
    ...ANGULAR_MODULES,
    RouterModule.forChild(PAGES_ROUTE),
    ...PROJECT_MODULES,
  ],
})
export class PagesModule {}
