import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { QuotesComponent } from './quotes/quotes.component';

const routes: Routes = [
  {
    path: '',
    component: QuizTvShowsComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'episodes',
    component: EpisodesComponent,
  },
  {
    path: 'quotes',
    component: QuotesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizTvShowsRoutingModule {}
