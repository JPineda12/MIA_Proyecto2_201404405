import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCartasComponent } from './ver-cartas.component';

describe('VerCartasComponent', () => {
  let component: VerCartasComponent;
  let fixture: ComponentFixture<VerCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
