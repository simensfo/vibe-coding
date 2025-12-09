/// <reference types="vitest" />
import { fireEvent, render, screen } from '@testing-library/react';
import SkillIcon from './SkillIcon';

describe('SkillIcon', () => {
  it('renders provided icon src', () => {
    render(<SkillIcon src="/test.png" alt="Skill" />);
    const img = screen.getByRole('img', { name: 'Skill' }) as HTMLImageElement;
    expect(img.src).toContain('/test.png');
  });

  it('falls back when image fails to load', () => {
    render(<SkillIcon src="/broken.png" alt="Broken" />);
    const img = screen.getByRole('img', { name: 'Broken' });
    fireEvent.error(img);
    expect((img as HTMLImageElement).src).toContain('/skill-fallback.svg');
  });
});
