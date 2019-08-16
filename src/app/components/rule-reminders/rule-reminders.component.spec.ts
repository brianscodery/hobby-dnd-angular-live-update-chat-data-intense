import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleRemindersComponent } from './rule-reminders.component';

describe('RuleRemindersComponent', () => {
  let component: RuleRemindersComponent;
  let fixture: ComponentFixture<RuleRemindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleRemindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
