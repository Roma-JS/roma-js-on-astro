import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';
import {
  fetchUpcomingRomajsEvents,
  fetchAllPastRomajsEvents,
} from '@api/meetup/queries.server';
import { formatVenueMapsHref } from 'utils/venue';

const lng = 'it';

export async function getHpItContent(): Promise<Readonly<HpContent>> {
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
      venue: nextEvent.venue
        ? {
            href: formatVenueMapsHref(nextEvent.venue),
            text: l10n('ctaVenue', { lng }),
          }
        : undefined,
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
    title: 'La tech community di Javascript su Roma',
    description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
    sections,
  };
}

export async function GET() {
  return new Response(JSON.stringify(await getHpItContent()));
}
