import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizTvShowsRoutingModule } from './quiz-tv-shows-routing.module';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';
import { CharactersComponent } from './characters/characters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [QuizTvShowsComponent, CharactersComponent],
  imports: [SharedModule, RouterModule, QuizTvShowsRoutingModule],
})
export class QuizTvShowsModule {}
