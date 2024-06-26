import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorErrorMessageComponent } from './validator-error-message.component';

describe('ValidatorErrorMessageComponent', () => {
  let component: ValidatorErrorMessageComponent;
  let fixture: ComponentFixture<ValidatorErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorErrorMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidatorErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
