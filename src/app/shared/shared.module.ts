import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule, // Exportar FormsModule para otros módulos
  ],
})
export class SharedModule {}
