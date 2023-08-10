import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'it';

export const itHpContent: Readonly<HpContent> = {
  title: 'La tech community di Javascript su Roma',
  description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
  sections: [
    {
      heading: l10n('nextTalkTitle'),
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

export async function get() {
  return {
    body: JSON.stringify(itHpContent),
  };
}
