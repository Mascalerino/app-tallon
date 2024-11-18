import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetMusicViewerRoutingModule } from './sheet-music-viewer-routing.module';
import { SheetMusicViewerComponent } from './sheet-music-viewer.component';

@NgModule({
  declarations: [SheetMusicViewerComponent],
  imports: [CommonModule, SheetMusicViewerRoutingModule],
})
export class SheetMusicViewerModule {}
