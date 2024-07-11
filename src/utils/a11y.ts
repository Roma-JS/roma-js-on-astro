import type { SlantedHeaderProps } from '@components/SlantedHeader/SlantedHeader';

export const h1HeadingDomId = 'rmjs-heading-h1';

export const slantedHeaderH1Config: Readonly<
  Pick<SlantedHeaderProps, 'heading' | 'headingId' | 'headingTabIndex'>
> = {
  heading: 'h1',
  headingId: h1HeadingDomId,
  headingTabIndex: '-1',
};
