import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarPerfilHijoPage } from './editar-perfil-hijo.page';

describe('EditarPerfilHijoPage', () => {
  let component: EditarPerfilHijoPage;
  let fixture: ComponentFixture<EditarPerfilHijoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPerfilHijoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPerfilHijoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
