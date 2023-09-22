import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';
import { fetchNextUpcomingRomajsEvent } from '@api/meetup/queries.server';

const lng = 'it';

export async function getHpItContent(): Promise<Readonly<HpContent>> {
  const upcomingEvents = await fetchNextUpcomingRomajsEvent();

  const nextEvent = upcomingEvents?.[0] || null;

  return {
    title: 'La tech community di Javascript su Roma',
    description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
    sections: [
      {
        heading: l10n('nextTalkTitle', { lng }),
        body: nextEvent?.title!,
        cta: {
          href: nextEvent?.eventUrl!,
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
