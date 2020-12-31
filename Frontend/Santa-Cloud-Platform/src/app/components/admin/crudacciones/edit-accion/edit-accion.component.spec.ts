import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccionComponent } from './edit-accion.component';

describe('EditAccionComponent', () => {
  let component: EditAccionComponent;
  let fixture: ComponentFixture<EditAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
