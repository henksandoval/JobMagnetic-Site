import '@testing-library/jest-dom';
import '@angular/localize/init';
import { render, screen } from '@testing-library/angular';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProfileService } from '../../../home/services/profile.service';

describe(RegisterComponent.name, () => {
  let mockProfileService: Partial<ProfileService>;
  let componentInstance: RegisterComponent;

  beforeEach(async () => {
    // Configuración del mock de ProfileService
    mockProfileService = {
      getEndpoints: jest.fn().mockReturnValue({
        profile: {
          personalData: 'https://api.example.com/profile/personal-data',
        },
      }),
      saveData: jest.fn().mockReturnValue(of({ success: true })),
    };

    const { fixture } = await render(RegisterComponent, {
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ProfileService, useValue: mockProfileService }, // Inyectar el mock
      ],
    });

    // Guardar la instancia del componente.
    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should call savePersonalData without errors', () => {
    // Llamar al método del componente
    componentInstance.savePersonalData();
    expect(mockProfileService.saveData).toHaveBeenCalled();
  });

  it('should initialize the form correctly', () => {
    componentInstance.ngOnInit();
    expect(componentInstance.personalDataForm).toBeDefined();
    expect(componentInstance.personalDataForm.controls['firstName']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['lastName']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['profileImageUrl']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['birthDate']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['middleName']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['secondLastName']).toBeDefined();
  });

  it('It should show the name ', () => {
    expect(screen.getByTestId('nombre')).toHaveTextContent('Nombre:');
  });

  it('It should show the lastName', () => {
    expect(screen.getByTestId('apellido')).toHaveTextContent('Apellido:');
  });

  it('It should show the middleName', () => {
    expect(screen.getByTestId('segundo nombre')).toHaveTextContent('Segundo nombre:');
  });

  it('It should show the second last name', () => {
    expect(screen.getByTestId('segundo apellido')).toHaveTextContent('Segundo apellido:');
  });

  it('It should show the birth date', () => {
    expect(screen.getByTestId('fecha de nacimiento')).toHaveTextContent('Fecha de nacimiento:');
  });

  it('It should show the profile image', () => {
    expect(screen.getByTestId('imagen del perfil')).toHaveTextContent('Imagen del perfil:');
  });
});
