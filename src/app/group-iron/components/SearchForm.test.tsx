import { render, screen } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('defaults input values', () => {
    render(<SearchForm size="3" competitive="false" />);
    expect(screen.getByLabelText(/Group size/i)).toHaveValue('3');
    expect(screen.getByLabelText(/Competitive/i)).toHaveValue('false');
  });
});
