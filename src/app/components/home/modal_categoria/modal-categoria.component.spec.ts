import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirComponent } from './modal-categoria.component';

describe('CompartirComponent', () => {
  let component: CompartirComponent;
  let fixture: ComponentFixture<CompartirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompartirComponent]
    });
    fixture = TestBed.createComponent(CompartirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
