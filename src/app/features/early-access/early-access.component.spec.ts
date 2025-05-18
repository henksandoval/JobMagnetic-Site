import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyAccessComponent } from './early-access.component';

describe('EarlyAccessComponent', () => {
  let component: EarlyAccessComponent;
  let fixture: ComponentFixture<EarlyAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarlyAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarlyAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
