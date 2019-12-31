import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MydayPage } from './myday.page';

describe('MydayPage', () => {
  let component: MydayPage;
  let fixture: ComponentFixture<MydayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MydayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
