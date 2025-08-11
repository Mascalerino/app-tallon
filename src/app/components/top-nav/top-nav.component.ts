import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  isHomePage: boolean = false;
  mobileMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detectar si estamos en la página principal
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/'; // Cambia según la ruta principal
      // Close mobile menu when navigating
      this.mobileMenuOpen = false;
    });
  }

  goBack(): void {
    window.history.back(); // Navegar hacia atrás
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Prevent body scroll when menu is open
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
