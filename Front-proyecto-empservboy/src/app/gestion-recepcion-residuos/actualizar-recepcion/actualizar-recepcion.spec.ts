import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRecepcion } from './actualizar-recepcion';

describe('ActualizarRecepcion', () => {
  let component: ActualizarRecepcion;
  let fixture: ComponentFixture<ActualizarRecepcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRecepcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarRecepcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
