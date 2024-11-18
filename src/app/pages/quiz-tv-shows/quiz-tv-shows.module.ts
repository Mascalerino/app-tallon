import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizTvShowsRoutingModule } from './quiz-tv-shows-routing.module';
import { QuizTvShowsComponent } from './quiz-tv-shows.component';

@NgModule({
  declarations: [QuizTvShowsComponent],
  imports: [CommonModule, QuizTvShowsRoutingModule],
})
export class QuizTvShowsModule {}
