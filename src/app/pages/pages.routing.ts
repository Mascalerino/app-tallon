import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export const PAGES_ROUTE: Routes = [
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
];
