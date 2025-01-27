import { NgModule } from '@angular/core';
import { WorkoutPlanRoutingModule } from './workout-plan-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkoutPlanComponent } from './workout-plan.component';

@NgModule({
  declarations: [WorkoutPlanComponent],
  imports: [SharedModule, WorkoutPlanRoutingModule],
})
export class WorkoutPlanModule {}
