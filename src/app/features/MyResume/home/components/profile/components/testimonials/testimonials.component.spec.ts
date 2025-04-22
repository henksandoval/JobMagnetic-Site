import { render, screen } from '@testing-library/angular';
import { TestimonialsComponent } from './testimonials.component';
import { Testimonial } from './interfaces/testimonial';
import '@angular/localize/init';
import { mockTestimonials } from './mocks/testimonials.mocks';

const renderComponent = async () => {
  await render(TestimonialsComponent, {
    inputs: {
      testimonialSet: mockTestimonials,
    },
  });
};

describe(TestimonialsComponent.name, () => {
  beforeEach(async () => {
    await renderComponent();
  });

  it('You must submit all records regarding the Testimonials.', () => {
    mockTestimonials.forEach((testimonial: Testimonial, id: number) => {
      const images = screen.getAllByTestId('image-src_' + id);
      const names = screen.getAllByTestId('name_' + id);
      const jobTitles = screen.getAllByTestId('jobTitle_' + id);
      const testimonials = screen.getAllByTestId('testimonial_' + id);

      expect(images.length).toBeGreaterThan(0);
      expect(names.length).toBeGreaterThan(0);
      expect(jobTitles.length).toBeGreaterThan(0);
      expect(testimonials.length).toBeGreaterThan(0);

      expect(images[0]).toHaveAttribute('src', testimonial.photoUrl);
      expect(names[0]).toHaveTextContent(testimonial.name);
      expect(jobTitles[0]).toHaveTextContent(testimonial.jobTitle);
      expect(testimonials[0]).toHaveTextContent(testimonial.testimonial);
      id++;
    });
  });
});

describe(TestimonialsComponent.name, () => {
  it('handles undefined correctly', async () => {
    await render(TestimonialsComponent, {
      inputs: {
        testimonialSet: undefined,
      },
    });

    expect(screen.getByTestId('testimonials')).toBeEmptyDOMElement();
  });
});
