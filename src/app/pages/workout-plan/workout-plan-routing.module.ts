import { NgModule } from '@angular/core';
import { WorkoutPlanComponent } from './workout-plan.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutPlanRoutingModule {}
