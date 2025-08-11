import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PanelComponent } from '../components/panel/panel.component';
import { QuizTableComponent } from '../components/quiz-table/quiz-table.component';
import { TopNavComponent } from '../components/top-nav/top-nav.component';

@NgModule({
  declarations: [
    PanelComponent,
    QuizTableComponent,
    TopNavComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule, // Exportar FormsModule para otros módulos
    RouterModule, // Exportar RouterModule para que esté disponible
    // Exportar componentes compartidos
    PanelComponent,
    QuizTableComponent,
    TopNavComponent,
  ],
})
export class SharedModule {}
