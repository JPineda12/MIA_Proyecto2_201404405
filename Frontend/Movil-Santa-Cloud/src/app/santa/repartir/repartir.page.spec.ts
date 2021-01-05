import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepartirPage } from './repartir.page';

describe('RepartirPage', () => {
  let component: RepartirPage;
  let fixture: ComponentFixture<RepartirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepartirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
