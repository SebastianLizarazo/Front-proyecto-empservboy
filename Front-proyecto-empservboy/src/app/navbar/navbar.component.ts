import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  showNavbar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verificar la ruta inicial
    this.checkRoute(this.router.url);

    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkRoute(event.url);
      });
  }

  checkRoute(url: string): void {
    const isLoginRoute = url === '/' || url === '/login' || url.startsWith('/login');
    const hasToken = !!localStorage.getItem('token');
    this.showNavbar = !isLoginRoute && hasToken;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.showNavbar = false;
    this.router.navigate(['/login']);
  }
}
