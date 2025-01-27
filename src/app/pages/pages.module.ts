import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { WorkoutPlanComponent } from './workout-plan/workout-plan.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
