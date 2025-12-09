import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    onError?: () => void;
  }) => React.createElement('img', { alt, ...props }),
}));

const headersMock = vi.fn();
const cookiesMock = vi.fn();

vi.mock('next/headers', () => ({
  headers: headersMock,
  cookies: cookiesMock,
}));

vi.mock('@/app/globals.css', () => ({}));

// re-export for convenience in tests
export const mockedHeaders = headersMock;
export const mockedCookies = cookiesMock;
