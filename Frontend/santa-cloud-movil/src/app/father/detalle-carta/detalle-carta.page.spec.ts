import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleCartaPage } from './detalle-carta.page';

describe('DetalleCartaPage', () => {
  let component: DetalleCartaPage;
  let fixture: ComponentFixture<DetalleCartaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCartaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleCartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
