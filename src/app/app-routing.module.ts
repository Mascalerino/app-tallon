import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { QuizTvShowsComponent } from './pages/quiz-tv-shows/quiz-tv-shows.component';
import { CharactersComponent } from './pages/quiz-tv-shows/characters/characters.component';
import { SheetMusicViewerComponent } from './pages/sheet-music-viewer/sheet-music-viewer.component';
import { EpisodesComponent } from './pages/quiz-tv-shows/episodes/episodes.component';
import { QuotesComponent } from './pages/quiz-tv-shows/quotes/quotes.component';
import { WorkoutPlanComponent } from './pages/workout-plan/workout-plan.component';

const routes: Routes = [
  { path: '', component: PagesComponent }, // Página principal
  { path: 'quiz-tv-shows', component: QuizTvShowsComponent }, // Ruta para el Quiz
  { path: 'quiz-tv-shows/characters', component: CharactersComponent }, // Ruta independiente para CharactersComponent
  { path: 'quiz-tv-shows/episodes', component: EpisodesComponent }, // Ruta independiente para EpisodesComponent
  { path: 'quiz-tv-shows/quotes', component: QuotesComponent }, // Ruta independiente para EpisodesComponent
  { path: 'sheet-music-viewer', component: SheetMusicViewerComponent }, // Ruta para el visor de partituras
  { path: 'workout-plan', component: WorkoutPlanComponent }, // Ruta para el plan de entrenamiento
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige rutas no válidas a la página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
