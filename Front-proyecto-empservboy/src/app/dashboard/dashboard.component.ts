import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  modules = [
    {
      title: 'Gestión de Clientes',
      description: 'Administrar información de clientes',
      icon: '👥',
      route: '/clientes',
      color: '#007bff'
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: '👤',
      route: '/usuarios',
      color: '#28a745'
    },
    {
      title: 'Gestión de Contratos',
      description: 'Administrar contratos',
      icon: '📄',
      route: '/contratos',
      color: '#ffc107'
    },
    {
      title: 'Gestión de Residuos',
      description: 'Administrar recepción de residuos',
      icon: '♻️',
      route: '/residuos',
      color: '#17a2b8'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
