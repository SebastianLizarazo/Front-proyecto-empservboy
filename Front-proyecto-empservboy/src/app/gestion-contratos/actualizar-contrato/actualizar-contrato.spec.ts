import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarContrato } from './actualizar-contrato';

describe('ActualizarContrato', () => {
  let component: ActualizarContrato;
  let fixture: ComponentFixture<ActualizarContrato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarContrato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarContrato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
