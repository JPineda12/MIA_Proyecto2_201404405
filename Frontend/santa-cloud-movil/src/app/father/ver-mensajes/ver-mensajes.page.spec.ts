import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerMensajesPage } from './ver-mensajes.page';

describe('VerMensajesPage', () => {
  let component: VerMensajesPage;
  let fixture: ComponentFixture<VerMensajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMensajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerMensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
