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
        body: 'RomaJS - Open Source night hack @ SourceSense',
        cta: {
          href: 'https://www.meetup.com/romajs/events/295438372/',
          text: l10n('ctaRegister', { lng }),
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
