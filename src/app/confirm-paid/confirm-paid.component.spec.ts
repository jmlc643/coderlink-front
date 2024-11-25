import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaidComponent } from './confirm-paid.component';

describe('ConfirmPaidComponent', () => {
  let component: ConfirmPaidComponent;
  let fixture: ComponentFixture<ConfirmPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
