import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  currentStep = 0;
  steps = [0, 1, 2];

  // Datos del formulario
  formData = {
    fullName: '',
    email: '',
    phone: '',
    description: '',
    birthday: '',
    city: '',
    testimonialName: '',
    jobTitle: '',
    testimonial: ''
  };

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.completeWizard();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  completeWizard() {
    console.log('Datos del formulario:', this.formData);
    alert('¡Registro completado!');
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      description: '',
      birthday: '',
      city: '',
      testimonialName: '',
      jobTitle: '',
      testimonial: ''
    };
    this.currentStep = 0;
  }
}
