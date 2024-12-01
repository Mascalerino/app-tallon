import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizTvShowsComponent } from './pages/quiz-tv-shows/quiz-tv-shows.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { CharactersComponent } from './pages/quiz-tv-shows/characters/characters.component';
import { SheetMusicViewerComponent } from './pages/sheet-music-viewer/sheet-music-viewer.component';
import { MusicPlayerComponent } from './pages/sheet-music-viewer/music-player/music-player.component';
import { EpisodesComponent } from './pages/quiz-tv-shows/episodes/episodes.component';
import { QuizTableComponent } from './components/quiz-table/quiz-table.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizTvShowsComponent,
    CharactersComponent,
    EpisodesComponent,
    SheetMusicViewerComponent,
    MusicPlayerComponent,
    PagesComponent,
    QuizTableComponent,
    PanelComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
