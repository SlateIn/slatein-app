import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlannerPage } from './planner.page';

describe('PlannerPage', () => {
  let component: PlannerPage;
  let fixture: ComponentFixture<PlannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlannerPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
