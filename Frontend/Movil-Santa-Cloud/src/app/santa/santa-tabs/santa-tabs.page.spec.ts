import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SantaTabsPage } from './santa-tabs.page';

describe('SantaTabsPage', () => {
  let component: SantaTabsPage;
  let fixture: ComponentFixture<SantaTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantaTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SantaTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
