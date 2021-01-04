import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidProductosComponent } from './kid-productos.component';

describe('KidProductosComponent', () => {
  let component: KidProductosComponent;
  let fixture: ComponentFixture<KidProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KidProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
