import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCartaComponent } from './detalle-carta.component';

describe('DetalleCartaComponent', () => {
  let component: DetalleCartaComponent;
  let fixture: ComponentFixture<DetalleCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
