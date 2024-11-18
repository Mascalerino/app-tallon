import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule), // Carga el módulo de Pages
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirección para rutas no existentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
