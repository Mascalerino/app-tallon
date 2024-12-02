import { CommonModule } from '@angular/common';
import { CharacterService } from './character.service';
import { EpisodeService } from './episode.service';
import { PdfLoaderService } from './pdf-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

const CORE_SERVICES = [CharacterService, EpisodeService, PdfLoaderService];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [...CORE_SERVICES],
})
export class ServicesModule {
  constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error(
        'ServicesModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
