import { l10n } from '@i18n/config';
import type { HpContent } from '../../../@types/hp';
import {
  fetchAllPastRomajsEvents,
  fetchUpcomingRomajsEvents,
} from '@api/meetup/queries.server';
import { formatVenueMapsHref } from 'utils/venue';
import { formatDate } from '@i18n/date-time';

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
      body: [nextEvent.title ?? ''].filter(Boolean),
      startDate: {
        dateTime: nextEvent.dateTime,
        label: formatDate(lng, nextEvent.dateTime),
      },
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
      body: [latestPastEvent.title || ''].filter(Boolean),
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

export async function GET() {
  return new Response(JSON.stringify(await getEnHpContent()));
}
