import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'en';

export async function getEnHpContent(): Promise<Readonly<HpContent>> {
  return {
    title: 'The Javascript community in Rome!',
    description: 'We meet locally & online every 3rd Wednesday of the month',
    sections: [
      {
        heading: l10n('nextTalkTitle', { lng }),
        body: 'How Open Source changed my life & Video editing con js - RomaJS @ Sourcesense',
        cta: {
          href: 'https://www.meetup.com/romajs/events/293424465/',
          text: l10n('ctaRegister', { lng }),
        },
      },
      {
        heading: l10n('latestTalkTitle', { lng }),
        body: 'Attack on NPM with Alessandro Miliucci',
        cta: {
          href: 'https://youtu.be/BSKXpTFzKf4?t=384',
          text: l10n('ctaVOD', { lng }),
        },
      },
    ],
  };
}

export async function get() {
  return {
    body: JSON.stringify(await getEnHpContent()),
  };
}
