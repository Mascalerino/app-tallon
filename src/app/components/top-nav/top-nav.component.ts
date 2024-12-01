import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detectar si estamos en la página principal
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/'; // Cambia según la ruta principal
    });
  }

  goBack(): void {
    window.history.back(); // Navegar hacia atrás
  }
}
