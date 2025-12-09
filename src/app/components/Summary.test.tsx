import { render, screen } from '@testing-library/react';
import type { HiscoreResponse } from '@/lib/types';
import Summary from './Summary';

const hiscore: HiscoreResponse = {
  name: 'Player',
  skills: [
    { id: 0, name: 'Overall', level: 2500, xp: 123456789, rank: 1 },
    { id: 1, name: 'Attack', level: 99, xp: 13034431, rank: 2 },
  ],
};

describe('Summary', () => {
  it('renders account information', () => {
    render(<Summary rsn="Player" hiscore={hiscore} qpTotal={350} />);
    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.getAllByText(/Total Level/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Quest Points/i)).toBeInTheDocument();
  });

  it('falls back to em dash when quest points missing', () => {
    render(<Summary rsn="Player" hiscore={null} qpTotal={null} />);
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });
});
