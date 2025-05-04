import { Testimonial } from '../interfaces/testimonial';

const mockTestimonial01: Testimonial = {
  name: 'Jane Doe',
  jobTitle: 'Software Engineer',
  photoUrl: 'https://example.com/photo1.jpg',
  testimonial:
    'Working with this team has been a fantastic experience. Their dedication to quality is unmatched.',
};

const mockTestimonial02: Testimonial = {
  name: 'John Smith',
  jobTitle: 'Project Manager',
  photoUrl: 'https://example.com/photo2.jpg',
  testimonial: 'The project was delivered on time and exceeded our expectations. Highly recommend!',
};

const mockTestimonial03: Testimonial = {
  name: 'Alice Johnson',
  jobTitle: 'UX Designer',
  photoUrl: 'https://example.com/photo3.jpg',
  testimonial: 'A creative team that brings ideas to life with exceptional design skills.',
};

const mockTestimonial04: Testimonial = {
  name: 'Michael Brown',
  jobTitle: 'CTO',
  photoUrl: 'https://example.com/photo4.jpg',
  testimonial: 'The team consistently delivered beyond expectations and maintained excellent communication.',
};

const mockTestimonial05: Testimonial = {
  name: 'Emily Davis',
  jobTitle: 'Product Owner',
  photoUrl: 'https://example.com/photo5.jpg',
  testimonial:
    'Their innovative solutions and commitment to quality have been pivotal in our project’s success, making them an invaluable partner in our journey.',
};

export const mockTestimonials: Testimonial[] = [
  mockTestimonial01,
  mockTestimonial02,
  mockTestimonial03,
  mockTestimonial04,
  mockTestimonial05,
];
