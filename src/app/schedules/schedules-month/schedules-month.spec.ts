import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesMonth } from './schedules-month';

describe('SchedulesMonth', () => {
  let component: SchedulesMonth;
  let fixture: ComponentFixture<SchedulesMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesMonth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
