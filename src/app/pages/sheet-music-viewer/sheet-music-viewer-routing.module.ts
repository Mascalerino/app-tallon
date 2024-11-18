import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetMusicViewerComponent } from './sheet-music-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: SheetMusicViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SheetMusicViewerRoutingModule {}
