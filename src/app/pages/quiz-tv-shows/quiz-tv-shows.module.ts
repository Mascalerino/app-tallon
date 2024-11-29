import { NgModule } from '@angular/core';
import { QuizTvShowsRoutingModule } from './quiz-tv-shows-routing.module';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';
import { CharactersComponent } from './characters/characters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EpisodesComponent } from './episodes/episodes.component';

@NgModule({
  declarations: [QuizTvShowsComponent, CharactersComponent, EpisodesComponent],
  imports: [SharedModule, RouterModule, QuizTvShowsRoutingModule],
})
export class QuizTvShowsModule {}
