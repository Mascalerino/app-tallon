import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },
  {
    path: 'quiz-tv-shows',
    loadChildren: () =>
      import('./quiz-tv-shows/quiz-tv-shows.module').then(
        (m) => m.QuizTvShowsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
