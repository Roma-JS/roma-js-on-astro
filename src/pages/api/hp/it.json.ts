import type { HpContent } from '../../../@types/hp';
import {
  fetchUpcomingRomajsEvents,
  fetchAllPastRomajsEvents,
} from '@api/meetup/queries.server';
import { formatVenueMapsHref } from 'utils/venue';
import { formatDate } from '@i18n/date-time';
import { computeScheduledEvents } from 'utils/meetup-events';
import { createTranslate } from '@i18n/translate';
import type { Lang } from '@i18n/types';

const lng: Lang = 'it';

export async function getHpItContent(): Promise<Readonly<HpContent>> {
  const [upcomingEvents, previousEvents, l10n] = await Promise.all([
    fetchUpcomingRomajsEvents(),
    fetchAllPastRomajsEvents(),
    createTranslate(lng),
  ]);

  const nextEventsByDate = computeScheduledEvents(upcomingEvents).sort(
    (a, b) => a.epochTimeMs - b.epochTimeMs
  );
  const latestPastEvent = previousEvents?.[0];

  const sections: HpContent['sections'] = [];

  sections.push(
    ...nextEventsByDate.map(({ data }) => ({
      heading: l10n('nextTalkTitle', { lng }),
      body: [data.title ?? ''].filter(Boolean),
      startDate: {
        dateTime: data.dateTime,
        label: formatDate(lng, data.dateTime),
      },
      cta: {
        href: data.eventUrl,
        text: l10n('ctaRegister', { lng }),
      },
      venue: data.venue
        ? {
            href: formatVenueMapsHref(data.venue),
            text: l10n('ctaVenue', { lng }),
          }
        : undefined,
    }))
  );

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
    title: 'La tech community di Javascript su Roma',
    description: 'Ci vediamo il prossimo terzo mercoledì del mese!',
    sections,
  };
}

export async function GET() {
  return new Response(JSON.stringify(await getHpItContent()));
}
