import { Service } from '../interfaces/service';
import { ServiceDetails } from '../interfaces/service-details';

export const mockServiceDetails: ServiceDetails = {
  name: 'SEO Consulting',
  description:
    "We optimize your website's performance and develop strategies to attract users interested in purchasing your products or hiring your services.",
  backgroundUrl: 'https://cdn.pixabay.com/photo/2024/08/06/10/43/wine-8949009_1280.jpg',
};

export const mockServiceDetails2: ServiceDetails = {
  name: 'Web and Brand Graphic Design',
  description:
    "Tell us your idea, and we'll make it a reality. We create a custom design based on your brand image, attractive for your visitors and efficient to ensure smooth navigation through your website.",
  backgroundUrl: 'https://cdn.pixabay.com/photo/2023/08/11/08/29/highland-cattle-8183107_1280.jpg',
};

export const mockServiceDetails3: ServiceDetails = {
  name: 'Web Development',
  description:
    'We bring your digital business vision to life with a 100% scalable website that you can update to stay current and ensure you are one step ahead of your competition.',
  backgroundUrl: 'https://cdn.pixabay.com/photo/2024/02/20/13/21/mountains-8585535_1280.jpg',
};

export const mockServiceDetails4: ServiceDetails = {
  name: 'App',
  description: 'We bring your digital business vision to life with a 100%',
  backgroundUrl: 'https://cdn.pixabay.com/photo/2024/01/25/10/50/mosque-8531576_1280.jpg',
};

export const mockService: Service = {
  overview:
    "We focus on understanding your company's needs to create a website tailored to your clients. You also have the support of our specialists in programming, design, and digital marketing to guide you through the process and resolve any questions you may have.",
  serviceDetails: [mockServiceDetails, mockServiceDetails2, mockServiceDetails3, mockServiceDetails4],
};
