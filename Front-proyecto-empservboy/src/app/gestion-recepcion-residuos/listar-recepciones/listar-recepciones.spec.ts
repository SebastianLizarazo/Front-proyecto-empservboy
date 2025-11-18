import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecepciones } from './listar-recepciones';

describe('ListarRecepciones', () => {
  let component: ListarRecepciones;
  let fixture: ComponentFixture<ListarRecepciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarRecepciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRecepciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
