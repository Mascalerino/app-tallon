import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicesModule } from './services/services.module';
import { ComponentModule } from './components/component.module';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

const ANGULAR_MODULES = [
  ServicesModule,
  ComponentModule,
  PagesModule,
  SharedModule,
];

@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ...ANGULAR_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
