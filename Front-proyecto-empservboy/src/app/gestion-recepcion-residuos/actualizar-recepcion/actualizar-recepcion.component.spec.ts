import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRecepcionComponent } from './actualizar-recepcion.component';

describe('ActualizarRecepcionComponent', () => {
  let component: ActualizarRecepcionComponent;
  let fixture: ComponentFixture<ActualizarRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRecepcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
