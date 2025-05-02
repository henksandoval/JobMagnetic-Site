import { Component } from '@angular/core';
import '@angular/localize/init';
import { AdminComponent } from './admin.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet, Routes } from '@angular/router';
import '@testing-library/jest-dom';
import { By } from '@angular/platform-browser';
import { IndexComponent } from './account/index/index.component';

@Component({
  standalone: true,
  template: '<p>Register Component</p>',
})
class MockRegisterComponent {}

describe('AdminComponent (Standalone)', () => {
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;

  const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
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
      imports: [AdminComponent, IndexComponent], // Importar el componente standalone
      providers: [provideRouter(routes)], // Proveer las rutas para las pruebas
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AdminComponent);
    router.navigateByUrl(''); // Navegación inicial
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have a <router-outlet>', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull(); // Verificar que el router-outlet exista
  });

  it('should render IndexComponent on base route', async () => {
    // Navegar a la ruta base ('')
    await router.navigate(['']);
    fixture.detectChanges();

    // Verificar que el contenido del IndexComponent se renderiza
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('¿Qué es una Vista Early Adopter?');
  });

  it('should render child route on navigation', async () => {
    // Navegar a la ruta hija "register"
    await router.navigate(['register']);
    fixture.detectChanges();

    // Verificar que el contenido del componente hijo se renderiza
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Register Component'); // Verificar el contenido del componente hijo
  });
});


