import { render, screen } from '@testing-library/react';
import GroupResults from './GroupResults';
import type { GroupEntry, GroupScoresResponse } from '@/lib/groupIron';

const mkGroup = (id: number, overrides: Partial<GroupEntry> = {}): GroupEntry => ({
  id,
  name: `Group ${id}`,
  groupTotalXp: 1000 * id,
  groupTotalLevel: 500 * id,
  size: 3,
  isCompetitive: true,
  ...overrides,
});

const baseResponse: GroupScoresResponse = {
  content: [mkGroup(1), mkGroup(2)],
  totalElements: 100,
  totalPages: 10,
  size: 25,
  empty: false,
};

describe('GroupResults', () => {
  it('renders rows with formatted values', () => {
    render(
      <GroupResults data={baseResponse} size="3" competitive="true" page="0" defaultPageSize={25} />
    );
    expect(screen.getByText(/Group 1/)).toBeInTheDocument();
    expect(screen.getByText(/Total: 100/)).toBeInTheDocument();
    expect(screen.getByText(/Page: 1 of 10/)).toBeInTheDocument();
  });
});
