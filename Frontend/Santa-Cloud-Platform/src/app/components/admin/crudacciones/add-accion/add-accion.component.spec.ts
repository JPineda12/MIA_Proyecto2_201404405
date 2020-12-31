import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccionComponent } from './add-accion.component';

describe('AddAccionComponent', () => {
  let component: AddAccionComponent;
  let fixture: ComponentFixture<AddAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
