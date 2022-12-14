import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'en';

export const enHpContent: Readonly<HpContent> = {
  title: 'The Javascript community in Rome!',
  description: 'We meet locally & online every 3rd Wednesday of the month',
  sections: [
    {
      heading: 'Coming up next',
      body: 'Qwik, with Giorgio Boa - RomaJS Meetup @ Immobiliare Labs',
      cta: {
        href: 'https://www.meetup.com/romajs/events/290831366/',
        text: l10n('ctaRegister', { lng }),
      },
    },
    {
      heading: l10n('latestTalkTitle', { lng }),
      body: 'Astro with Fabio Biondi - RomaJS #AperiTech Xmas 2022',
      cta: {
        href: 'https://www.youtube.com/@RomaJS/streams',
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
