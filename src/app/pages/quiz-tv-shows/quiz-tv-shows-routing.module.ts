import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';

const routes: Routes = [
  {
    path: '',
    component: QuizTvShowsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizTvShowsRoutingModule {}
