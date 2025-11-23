import { Component, OnInit } from '@angular/core';
import { Residuo } from '../Interfaces/residuo.interface';
import { Cliente } from '../../gestion-clientes/Interfaces/cliente.interface';
import { GestionRecepcionResiduosService } from '../gestion-recepcion-residuos-service.service';
import { GestionClientesServiceService } from '../../gestion-clientes/gestion-clientes-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-recepcion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-recepcion.component.html'
})
export class CrearRecepcionComponent implements OnInit {
  recepcionForm: FormGroup;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private residuoService: GestionRecepcionResiduosService,
    private clienteService: GestionClientesServiceService,
    private router: Router
  ) {
    this.recepcionForm = this.fb.group({
      cliente_id: ['', Validators.required],
      tipo_residuo: ['', Validators.required],
      cantidad_kg: ['', [Validators.required, Validators.min(0)]],
      fecha_recepcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        alert('Error al cargar la lista de clientes');
      }
    });
  }

  onSubmit(): void {
    if (this.recepcionForm.valid) {
      const nuevaRecepcion: Residuo = this.recepcionForm.value;

      this.residuoService.addResiduo(nuevaRecepcion).subscribe({
        next: (res) => {
          console.log('Recepción creada:', res);
          alert('Recepción creada con éxito');
          this.recepcionForm.reset();
          this.router.navigate(['/residuos']);
        },
        error: (err) => {
          console.error('Error al crear recepción:', err);
          alert('Error al guardar la recepción');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/residuos']);
  }
}
