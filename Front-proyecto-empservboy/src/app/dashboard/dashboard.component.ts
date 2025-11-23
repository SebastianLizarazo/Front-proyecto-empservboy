import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private autoPlayInterval: any;

  images = [
    {
      url: '/assets/carousel-images/carousel1.jpeg',
      alt: 'Imagen 1',
    },
    {
      url: '/assets/carousel-images/carousel2.png',
      alt: 'Imagen 2',
    },
    {
      url: '/assets/carousel-images/carousel3.png',
      alt: 'Imagen 3',
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.images.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 10000); // Cambiar imagen cada 10 segundos
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
