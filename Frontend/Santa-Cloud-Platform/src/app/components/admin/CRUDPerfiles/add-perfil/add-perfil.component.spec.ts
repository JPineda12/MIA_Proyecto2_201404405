import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerfilComponent } from './add-perfil.component';

describe('AddPerfilComponent', () => {
  let component: AddPerfilComponent;
  let fixture: ComponentFixture<AddPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
