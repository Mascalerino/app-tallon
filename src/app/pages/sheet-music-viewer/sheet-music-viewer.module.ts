import { NgModule } from '@angular/core';

import { SheetMusicViewerRoutingModule } from './sheet-music-viewer-routing.module';
import { SheetMusicViewerComponent } from './sheet-music-viewer.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PdfLoaderService } from 'src/app/services/pdf-loader.service';

@NgModule({
  declarations: [SheetMusicViewerComponent, MusicPlayerComponent],
  providers: [PdfLoaderService],
  imports: [SharedModule, SheetMusicViewerRoutingModule],
})
export class SheetMusicViewerModule {}
