import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'it';

export const itHpContent: Readonly<HpContent> = {
  title: 'La tech community di Javascript su Roma',
  description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
  sections: [
    {
      heading: 'Coming up next',
      body: 'Qwik, con Giorgio Boa - RomaJS Meetup @ Immobiliare Labs',
      cta: {
        href: 'https://www.meetup.com/romajs/events/290831366/',
        text: l10n('ctaRegister', { lng }),
      },
    },
    {
      heading: l10n('latestTalkTitle', { lng }),
      body: 'Astro, con Fabio Biondi - RomaJS #AperiTech Natalizio 2022',
      cta: {
        href: 'https://www.youtube.com/@RomaJS/streams',
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
