import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';
import { QuotesComponent } from './quotes/quotes.component';

export const QUIZ_TV_SHOWS_ROUTE = [
  {
    path: 'quiz-tv-shows',
    component: QuizTvShowsComponent,
    children: [
      {
        path: 'quiz-tv-shows/characters',
        component: CharactersComponent,
      },
      {
        path: 'quiz-tv-shows/episodes',
        component: EpisodesComponent,
      },
      {
        path: 'quiz-tv-shows/quotes',
        component: QuotesComponent,
      },
    ],
  },
];
