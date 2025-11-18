import { Component } from '@angular/core';
import { AutenticacionServiceService } from '../autenticacion-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AutenticacionServiceService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login exitoso');
        this.router.navigate(['/clientes']);
      },
      error: err => {
        console.error('Error en el login', err);
      }
    });
  }
}
