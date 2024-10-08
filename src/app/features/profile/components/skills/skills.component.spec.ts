import { render, screen } from '@testing-library/angular';
import { SkillsComponent } from './skills.component';
import '@testing-library/jest-dom';
import { mockSkills } from './mockSkills';
import { SkillDetail } from './skills';

const renderComponent = async () => {
  await render(SkillsComponent, {
    inputs: {
      skillSet: mockSkills,
    },
  });
};

describe('SkillsComponent', () => {
  beforeEach(async () => {
    await renderComponent();
  });

  it('Must display Skills title.', () => {
    expect(screen.getByTestId('skill_overview')).toHaveTextContent(mockSkills.overview);
  });

  it('You must submit all records regarding the Skills.', () => {
    mockSkills.skillDetails.forEach((skill: SkillDetail, index: number) => {
      const id: string = (++index).toString().padStart(2, '0');
      expect(screen.getByTestId('image-src_' + id)).toHaveAttribute('src', skill.iconUrl);
      expect(screen.getByTestId('name_' + id)).toHaveTextContent(skill.name);
    });
  });
});

describe('SkillComponentNullScenary', () => {
  it('handles undefined correctly', async () => {
    await render(SkillsComponent, {
      inputs: {
        skillSet: undefined,
      },
    });

    expect(screen.getByTestId('skills')).toBeEmptyDOMElement();
  });
});
