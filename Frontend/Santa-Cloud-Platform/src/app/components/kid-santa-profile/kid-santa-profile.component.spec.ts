import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidSantaProfileComponent } from './kid-santa-profile.component';

describe('KidSantaProfileComponent', () => {
  let component: KidSantaProfileComponent;
  let fixture: ComponentFixture<KidSantaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidSantaProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KidSantaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
