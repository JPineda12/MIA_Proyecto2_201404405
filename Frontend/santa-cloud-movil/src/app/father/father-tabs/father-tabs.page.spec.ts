import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FatherTabsPage } from './father-tabs.page';

describe('FatherTabsPage', () => {
  let component: FatherTabsPage;
  let fixture: ComponentFixture<FatherTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FatherTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FatherTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
