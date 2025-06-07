import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvManagerComponent } from './cv-manager.component';

describe('CvManagerComponent', () => {
  let component: CvManagerComponent;
  let fixture: ComponentFixture<CvManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
