import { vi } from 'vitest';

// Mock global setup for vitest
vi.mock('@2nist/ui-hooks', () => ({
  useDragDropChords: vi.fn(),
}));