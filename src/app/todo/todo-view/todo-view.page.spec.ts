import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoViewPage } from './todo-view.page';

describe('TodoViewPage', () => {
  let component: TodoViewPage;
  let fixture: ComponentFixture<TodoViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
