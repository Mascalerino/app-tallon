import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', component: PagesComponent }, // Página principal
  { path: 'quiz-tv-shows', loadChildren: () => import('./pages/quiz-tv-shows/quiz-tv-shows.module').then(m => m.QuizTvShowsModule) }, // Ruta para el Quiz
  { path: 'sheet-music-viewer', loadChildren: () => import('./pages/sheet-music-viewer/sheet-music-viewer.module').then(m => m.SheetMusicViewerModule) }, // Ruta para el visor de partituras
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige rutas no válidas a la página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
