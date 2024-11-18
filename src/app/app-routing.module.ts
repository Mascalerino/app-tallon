import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { QuizTvShowsComponent } from './pages/quiz-tv-shows/quiz-tv-shows.component';
import { CharactersComponent } from './pages/quiz-tv-shows/characters/characters.component';
import { SheetMusicViewerComponent } from './pages/sheet-music-viewer/sheet-music-viewer.component';

const routes: Routes = [
  { path: '', component: PagesComponent }, // Página principal
  { path: 'quiz-tv-shows', component: QuizTvShowsComponent }, // Ruta para el Quiz
  { path: 'quiz-tv-shows/characters', component: CharactersComponent }, // Ruta independiente para CharactersComponent
  { path: 'sheet-music-viewer', component: SheetMusicViewerComponent }, // Ruta para el visor de partituras
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige rutas no válidas a la página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
