import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { QuizTableComponent } from './quiz-table/quiz-table.component';
import { TopNavComponent } from './top-nav/top-nav.component';

const COMPONENT_MODULES = [PanelComponent, QuizTableComponent, TopNavComponent];

@NgModule({
  declarations: [...COMPONENT_MODULES],
  exports: [...COMPONENT_MODULES],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ComponentModule {}
