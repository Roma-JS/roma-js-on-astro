import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';
import { fetchNextUpcomingRomajsEvent } from '@api/meetup/queries.server';

const lng = 'en';

export async function getEnHpContent(): Promise<Readonly<HpContent>> {
  const upcomingEvents = await fetchNextUpcomingRomajsEvent();

  const nextEvent = upcomingEvents?.[0] || null;

  return {
    title: 'The Javascript community in Rome!',
    description: 'We meet locally & online every 3rd Wednesday of the month',
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
    body: JSON.stringify(await getEnHpContent()),
  };
}
