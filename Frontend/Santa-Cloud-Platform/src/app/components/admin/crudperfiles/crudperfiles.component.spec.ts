import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDPerfilesComponent } from './crudperfiles.component';

describe('CRUDPerfilesComponent', () => {
  let component: CRUDPerfilesComponent;
  let fixture: ComponentFixture<CRUDPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRUDPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
