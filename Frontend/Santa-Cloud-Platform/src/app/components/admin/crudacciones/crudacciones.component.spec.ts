import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDAccionesComponent } from './crudacciones.component';

describe('CRUDAccionesComponent', () => {
  let component: CRUDAccionesComponent;
  let fixture: ComponentFixture<CRUDAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRUDAccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
