import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnswersComponent } from './all-answers.component';

describe('AllAswersComponent', () => {
  let component: AllAnswersComponent;
  let fixture: ComponentFixture<AllAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAnswersComponent]
    });
    fixture = TestBed.createComponent(AllAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
