import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPromptModelComponent } from './confirmation-prompt-model.component';

describe('ConfirmationPromptModelComponent', () => {
  let component: ConfirmationPromptModelComponent;
  let fixture: ComponentFixture<ConfirmationPromptModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationPromptModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPromptModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
