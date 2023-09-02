import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';

const lng = 'it';

export async function getHpItContent(): Promise<Readonly<HpContent>> {
  return {
    title: 'La tech community di Javascript su Roma',
    description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
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
    body: JSON.stringify(await getHpItContent()),
  };
}
