import { NgModule } from '@angular/core';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';
import { CharactersComponent } from './characters/characters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EpisodesComponent } from './episodes/episodes.component';
import { QuotesComponent } from './quotes/quotes.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QUIZ_TV_SHOWS_ROUTE } from './quiz-tv-shows.routing';

const PROJECT_MODULES = [
  SharedModule,
  CharactersComponent,
  EpisodesComponent,
  QuotesComponent,
];
const ANGULAR_MODULES = [CommonModule, FormsModule];

@NgModule({
  declarations: [QuizTvShowsComponent],
  exports: [QuizTvShowsComponent],
  imports: [
    ...ANGULAR_MODULES,
    RouterModule.forChild(QUIZ_TV_SHOWS_ROUTE),
    ...PROJECT_MODULES,
  ],
})
export class QuizTvShowsModule {}
