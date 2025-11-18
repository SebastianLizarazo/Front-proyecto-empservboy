import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContratos } from './listar-contratos';

describe('ListarContratos', () => {
  let component: ListarContratos;
  let fixture: ComponentFixture<ListarContratos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarContratos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarContratos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
