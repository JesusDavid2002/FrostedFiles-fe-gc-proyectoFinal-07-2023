import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalChartComponent } from './global-chart.component';

describe('GlobalChartComponent', () => {
  let component: GlobalChartComponent;
  let fixture: ComponentFixture<GlobalChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalChartComponent]
    });
    fixture = TestBed.createComponent(GlobalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
