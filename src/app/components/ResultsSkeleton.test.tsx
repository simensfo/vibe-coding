import { render } from '@testing-library/react';
import ResultsSkeleton from './ResultsSkeleton';

describe('ResultsSkeleton', () => {
  it('renders multiple placeholder sections', () => {
    const { container } = render(<ResultsSkeleton />);
    expect(container.querySelectorAll('section').length).toBe(3);
    expect(container.querySelectorAll('div').length).toBeGreaterThan(10);
  });
});
