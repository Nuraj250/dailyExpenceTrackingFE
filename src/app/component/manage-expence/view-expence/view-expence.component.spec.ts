import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenceComponent } from './view-expence.component';

describe('ViewExpenceComponent', () => {
  let component: ViewExpenceComponent;
  let fixture: ComponentFixture<ViewExpenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExpenceComponent]
    });
    fixture = TestBed.createComponent(ViewExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
