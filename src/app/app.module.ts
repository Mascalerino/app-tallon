import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizTvShowsComponent } from './pages/quiz-tv-shows/quiz-tv-shows.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { CharactersComponent } from './pages/quiz-tv-shows/characters/characters.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizTvShowsComponent,
    CharactersComponent,
    PagesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
