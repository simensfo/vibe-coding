import { render, screen } from '@testing-library/react';
import ActivitySection from './ActivitySection';

const baseProfile = {
  name: 'Player',
  rank: 1,
  activities: [{ text: 'Leveled up', details: '', date: 'today' }],
};

describe('ActivitySection', () => {
  it('shows error when profile is missing', () => {
    render(<ActivitySection profile={null} />);
    expect(
      screen.getByText(/Unable to load profile\/activity \(account may be private\)/i)
    ).toBeInTheDocument();
  });

  it('shows empty message when there is no activity', () => {
    render(<ActivitySection profile={{ ...baseProfile, activities: [] }} />);
    expect(screen.getByText(/No recent activity/i)).toBeInTheDocument();
  });

  it('lists activities when provided', () => {
    render(<ActivitySection profile={baseProfile} />);
    expect(screen.getByText('Leveled up')).toBeInTheDocument();
    expect(screen.getByText('today')).toBeInTheDocument();
  });
});
