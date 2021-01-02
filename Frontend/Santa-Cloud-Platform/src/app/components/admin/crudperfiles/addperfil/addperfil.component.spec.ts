import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddperfilComponent } from './addperfil.component';

describe('AddperfilComponent', () => {
  let component: AddperfilComponent;
  let fixture: ComponentFixture<AddperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddperfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
