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
  id: string = '';
  password: string = '';

  constructor(private authService: AutenticacionServiceService, private router: Router) { }

  login() {
  this.authService.login(this.id, this.password).subscribe({
    next: (res: any) => {
      console.log('Login exitoso');

      localStorage.setItem('token', res.token);

      this.router.navigate(['/dashboard']);
    },
    error: err => {
      console.error('Error en el login', err);
    }
  });
}
}
