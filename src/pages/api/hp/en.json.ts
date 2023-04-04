import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'en';

export const enHpContent: Readonly<HpContent> = {
  title: 'The Javascript community in Rome!',
  description: 'We meet locally & online every 3rd Wednesday of the month',
  sections: [
    {
      heading: l10n('nextTalkTitle'),
      body: 'Attack on NPM with Alessandro Miliucci @ SourceSense',
      cta: {
        href: 'https://www.meetup.com/romajs/events/292355926/',
        text: l10n('ctaRegister', { lng }),
      },
    },
    {
      heading: l10n('latestTalkTitle', { lng }),
      body: 'The evolution of JavaScript, with Luca Casonato & Nicolò Ribaudo',
      cta: {
        href: 'https://youtu.be/1hYJujpkwlA?t=567',
        text: l10n('ctaVOD', { lng }),
      },
    },
  ],
};

export async function get() {
  return {
    body: JSON.stringify(enHpContent),
  };
}
