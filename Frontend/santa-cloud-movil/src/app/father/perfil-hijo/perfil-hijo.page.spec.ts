import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilHijoPage } from './perfil-hijo.page';

describe('PerfilHijoPage', () => {
  let component: PerfilHijoPage;
  let fixture: ComponentFixture<PerfilHijoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilHijoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilHijoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
