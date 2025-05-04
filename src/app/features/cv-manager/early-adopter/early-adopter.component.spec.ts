import { Component } from '@angular/core';
import '@angular/localize/init';
import { EarlyAdopterComponent } from './early-adopter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet, Routes } from '@angular/router';
import '@testing-library/jest-dom';
import { By } from '@angular/platform-browser';
import { IndexComponent } from './components/index/index.component';

@Component({
  standalone: true,
  template: '<p>Register Component</p>',
})
class MockRegisterComponent {}

describe('EarlyAdopterComponent (Standalone)', () => {
  let fixture: ComponentFixture<EarlyAdopterComponent>;
  let router: Router;

  const routes: Routes = [
    {
      path: '',
      component: EarlyAdopterComponent,
      children: [
        {
          path: '', component: IndexComponent
        },
        { path: 'register', component: MockRegisterComponent
        }
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarlyAdopterComponent, IndexComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(EarlyAdopterComponent);
    router.navigateByUrl('');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have a <router-outlet>', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });
});


