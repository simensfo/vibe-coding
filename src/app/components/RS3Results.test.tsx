import { renderToStaticMarkup } from 'react-dom/server';
import { Mock, vi } from 'vitest';
import RS3Results from './RS3Results';

vi.mock('@/lib/api', () => ({
  fetchHiscore: vi.fn(),
  fetchQuests: vi.fn(),
  fetchProfile: vi.fn(),
}));

vi.mock('@/app/components/Summary', () => ({
  __esModule: true,
  default: ({ rsn }: { rsn: string }) => <div data-testid="summary">{rsn}</div>,
}));

vi.mock('@/app/components/LevelsGrid', () => ({
  __esModule: true,
  default: ({ skills }: { skills: unknown[] }) => <div data-testid="levels">{skills.length}</div>,
}));

vi.mock('@/app/components/ActivitySection', () => ({
  __esModule: true,
  default: ({ profile }: { profile: unknown }) => (
    <div data-testid="activity">{profile ? 'ok' : 'missing'}</div>
  ),
}));

import { fetchHiscore, fetchQuests, fetchProfile } from '@/lib/api';

describe('RS3Results', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders summary and levels when data is available', async () => {
    (fetchHiscore as unknown as Mock).mockResolvedValue({ skills: [{ id: 1, name: 'Attack' }] });
    (fetchQuests as unknown as Mock).mockResolvedValue({ quests: [] });
    (fetchProfile as unknown as Mock).mockResolvedValue({ activities: [] });

    const html = renderToStaticMarkup(await RS3Results({ rsn: 'Alice' }));
    expect(html).toContain('data-testid="summary"');
    expect(html).toContain('data-testid="levels"');
  });

  it('shows error alert when any request fails', async () => {
    (fetchHiscore as unknown as Mock).mockResolvedValue(null);
    (fetchQuests as unknown as Mock).mockResolvedValue(null);
    (fetchProfile as unknown as Mock).mockResolvedValue(null);

    const html = renderToStaticMarkup(await RS3Results({ rsn: 'Bob' }));
    expect(html).toContain('Some data could not be loaded');
    expect(html).not.toContain('data-testid="levels"');
  });
});
