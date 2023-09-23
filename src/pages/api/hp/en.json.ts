import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';
import {
  fetchAllPastRomajsEvents,
  fetchUpcomingRomajsEvents,
} from '@api/meetup/queries.server';

const lng = 'en';

export async function getEnHpContent(): Promise<Readonly<HpContent>> {
  const [upcomingEvents, previousEvents] = await Promise.all([
    fetchUpcomingRomajsEvents(),
    fetchAllPastRomajsEvents(),
  ]);
  const nextEvent = upcomingEvents?.[0] || null;
  const latestPastEvent = previousEvents?.[0];

  const sections: HpContent['sections'] = [];

  if (nextEvent) {
    sections.push({
      heading: l10n('nextTalkTitle', { lng }),
      body: nextEvent.title || '',
      cta: {
        href: nextEvent.eventUrl,
        text: l10n('ctaRegister', { lng }),
      },
    });
  }

  if (latestPastEvent) {
    sections.push({
      heading: l10n('latestTalkTitle', { lng }),
      body: latestPastEvent.title || '',
      cta: {
        href: import.meta.env.PUBLIC_YOUTUBE_PAGE_HREF,
        text: l10n('ctaVOD', { lng }),
      },
    });
  }

  return {
    title: 'The Javascript community in Rome!',
    description: 'We meet locally & online every 3rd Wednesday of the month',
    sections,
  };
}

export async function get() {
  return {
    body: JSON.stringify(await getEnHpContent()),
  };
}
