import { render, screen } from '@testing-library/react';
import type { HiscoreSkill } from '@/lib/types';
import LevelsGrid from './LevelsGrid';

const skills: HiscoreSkill[] = [
  { id: 2, name: 'Defence', level: 80, xp: 1000, rank: 1 },
  { id: 1, name: 'Attack', level: 90, xp: 2000, rank: 2 },
  { id: 0, name: 'Overall', level: 2500, xp: 1000000, rank: 3 },
];

describe('LevelsGrid', () => {
  it('renders skills sorted and filters out Overall', () => {
    render(<LevelsGrid skills={skills} />);
    const cells = screen.getAllByText(/xp/);
    expect(cells.length).toBe(2);
    expect(screen.queryByText(/Overall/)).not.toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
  });
});
