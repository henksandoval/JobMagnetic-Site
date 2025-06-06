import { Education } from '../interfaces/education';
import userEvent from '@testing-library/user-event';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EducationDialogComponent } from './education-dialog.component';
import { render, screen } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const mockEducationData: Partial<Education> = {
  degree: 'Ingeniería de Software',
  institutionName: 'Universidad de la Programación',
  institutionLocation: 'Ciudad Código',
  description: 'Estudios avanzados en desarrollo de software.',
  startDate: new Date('2020-09-01'),
  endDate: new Date('2024-06-30'),
};

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

describe('EducationDialogComponent', () => {
  const user = userEvent.setup();
  let closeDialogSpy: jest.Mock;

  beforeEach(async () => {
    closeDialogSpy = jest.fn();

    await render(EducationDialogComponent, {
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: closeDialogSpy
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
  });

  it('Should render the dialog title and form fields', () => {
    expect(screen.getByText('Insert Education')).toBeInTheDocument();
    expect(screen.getByLabelText('Degree')).toBeInTheDocument();
    expect(screen.getByLabelText('Institution Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
  });

  it('Should enable the save button and call dialogRef.close with the data when saving', async () => {
    const degreeInput = screen.getByLabelText('Degree');
    const institutionNameInput = screen.getByLabelText('Institution Name');
    const institutionLocationInput = screen.getByLabelText('Location');
    const descriptionInput = screen.getByLabelText('Description');
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.type(degreeInput, mockEducationData.degree!);
    await user.type(institutionNameInput, mockEducationData.institutionName!);
    await user.type(institutionLocationInput, mockEducationData.institutionLocation!);
    await user.type(descriptionInput, mockEducationData.description!);
    await user.clear(startDateInput);
    await user.type(startDateInput, formatDateForInput(mockEducationData.startDate!));
    await user.clear(endDateInput);
    await user.type(endDateInput, formatDateForInput(mockEducationData.endDate!));

    await user.click(saveButton);

    expect(closeDialogSpy).toHaveBeenCalledTimes(2);

    const expectedData = {
      degree: mockEducationData.degree,
      institutionName: mockEducationData.institutionName,
      institutionLocation: mockEducationData.institutionLocation,
      description: mockEducationData.description,
      startDate: formatDateForInput(mockEducationData.startDate!),
      endDate: formatDateForInput(mockEducationData.endDate!),
    };
    expect(closeDialogSpy).toHaveBeenCalledWith(
      expect.objectContaining(expectedData)
    );
    expect(closeDialogSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: expect.any(String),
      })
    );
  });

  it('Should keep the save button disabled if required fields are missing', async () => {
    const saveButton = screen.getByRole('button', { name: /save/i });
    const degreeInput = screen.getByLabelText('Degree');
    const institutionNameInput = screen.getByLabelText('Institution Name');

    await user.type(degreeInput, mockEducationData.degree!);
    expect(saveButton).toBeDisabled();

    await user.type(institutionNameInput, mockEducationData.institutionName!);
    expect(saveButton).toBeDisabled();
  });

  it('Should call dialogRef.close with null when the Cancel button is clicked', async () => {
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(closeDialogSpy).toHaveBeenCalledTimes(1);
    expect(closeDialogSpy).toHaveBeenCalledWith(null);
  });
});
