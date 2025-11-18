import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecepcion } from './crear-recepcion';

describe('CrearRecepcion', () => {
  let component: CrearRecepcion;
  let fixture: ComponentFixture<CrearRecepcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRecepcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRecepcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
