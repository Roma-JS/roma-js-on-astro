import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'it';

export const itHpContent: Readonly<HpContent> = {
  title: 'La tech community di Javascript su Roma',
  description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
  sections: [
    {
      heading: 'Coming up next',
      body: 'React Native, con Matteo Manchi - RomaJS Meetup @ Engineering',
      cta: {
        href: 'https://www.meetup.com/romajs/events/291443684/',
        text: l10n('ctaRegister', { lng }),
      },
    },
    {
      heading: l10n('latestTalkTitle', { lng }),
      body: 'Qwik, con Giorgio Boa - RomaJS Meetup @ Immobiliare Labs',
      cta: {
        href: 'https://youtu.be/Mc5ml-fjVwI?t=354',
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
