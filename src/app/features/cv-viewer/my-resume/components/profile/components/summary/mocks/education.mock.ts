import { AcademicBackground } from '../interfaces/academic-background';
import { Education } from '../interfaces/education';

export const mockAcademicBackground: AcademicBackground = {
  experience: 'Master of Fine Arts & Graphic Design',
  rangeDate: '2020-2022',
  academy: 'Rochester Institute of Technology, Rochester, NY',
  description:
    'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend',
};

export const mockAcademicBackground01: AcademicBackground = {
  experience: 'Bachelor of Fine Arts & Graphic Design',
  rangeDate: '2014-2018',
  academy: 'Rochester Institute of Technology, Rochester, NY',
  description:
    'Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila',
};

export const mockEducation: Education = {
  academicBackground: [mockAcademicBackground, mockAcademicBackground01],
};
