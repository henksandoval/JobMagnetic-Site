import { render, screen } from '@testing-library/angular';
import { ContactComponent } from './contact.component';
import { mockContact } from './mocks/contact-profile.mock';

const renderComponent = async () => {
  await render(ContactComponent, {
    inputs: {
      contactSet: mockContact,
    },
  });
};

describe(ContactComponent.name, () => {
  beforeEach(async () => {
    await renderComponent();
  });

  it('should display contact data correctly', () => {
    expect(screen.getByTestId('email')).toHaveTextContent(mockContact.email);
    expect(screen.getByTestId('phoneNumber')).toHaveTextContent(mockContact.phoneNumber);
    expect(screen.getByTestId('direction')).toHaveTextContent(mockContact.direction);
  });
});

describe(ContactComponent.name, () => {
  it('handles undefined correctly', async () => {
    await render(ContactComponent, {
      inputs: {
        contactSet: undefined,
      },
    });

    expect(screen.getByTestId('contact')).toBeEmptyDOMElement();
  });
});
