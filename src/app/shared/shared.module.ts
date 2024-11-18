import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule, // Exportar FormsModule para otros módulos
  ],
})
export class SharedModule {}
