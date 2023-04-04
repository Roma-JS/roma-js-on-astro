import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'it';

export const itHpContent: Readonly<HpContent> = {
  title: 'La tech community di Javascript su Roma',
  description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
  sections: [
    {
      heading: l10n('nextTalkTitle'),
      body: 'Attack on NPM con Alessandro Miliucci @ SourceSense',
      cta: {
        href: 'https://www.meetup.com/romajs/events/292355926/',
        text: l10n('ctaRegister', { lng }),
      },
    },
    {
      heading: l10n('latestTalkTitle', { lng }),
      body: 'The evolution of JavaScript, con Luca Casonato & Nicolò Ribaudo',
      cta: {
        href: 'https://youtu.be/1hYJujpkwlA?t=567',
        text: l10n('ctaVOD', { lng }),
      },
    },
  ],
};

export async function get() {
  return {
    body: JSON.stringify(itHpContent),
  };
}
