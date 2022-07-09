import { createBreakpoints } from '@solid-primitives/media';

export const appBreakpooints = Object.freeze({
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1400px',
} as const);

export function createAppBreakpoints() {
  return createBreakpoints(appBreakpooints);
}
