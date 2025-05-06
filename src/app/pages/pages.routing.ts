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
  {
    path: 'sheet-music-viewer',
    loadChildren: () =>
      import('./sheet-music-viewer/sheet-music-viewer.module').then(
        (m) => m.SheetMusicViewerModule
      ),
  },
  // {
  //   path: 'workout-plan',
  //   loadChildren: () =>
  //     import('./workout-plan/workout-plan.module').then(
  //       (m) => m.WorkoutPlanModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
