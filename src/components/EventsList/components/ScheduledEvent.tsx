import type { Lang } from '@i18n/types';
import type { JSX } from 'solid-js/jsx-runtime';
import { formatDate } from '@i18n/date-time';
import type { MeetupArticleFragment } from '@api/meetup/events.graphql.generated';
import { Dynamic } from 'solid-js/web';

export interface ScheduleEventProps {
  event: MeetupArticleFragment;
  lang: Lang;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const defaultHeading: NonNullable<ScheduleEventProps['heading']> = 'h2';

export function ScheduledEvent(props: ScheduleEventProps): JSX.Element {
  return (
    <section class="grid grid-cols-1 items-center gap-4 border-3 border-ink bg-paper p-5 shadow-brutal hover:bg-brand-yellow md:grid-cols-[200px_1fr] md:p-6">
      <time
        datetime={new Date(props.event.dateTime).toISOString()}
        class="font-bold uppercase tracking-widest text-ink-soft"
      >
        {formatDate(props.lang, new Date(props.event.dateTime))}
      </time>
      <Dynamic
        component={props.heading ?? defaultHeading}
        class="m-0 text-xl font-bold uppercase leading-tight text-ink"
      >
        <a
          class="underline decoration-2 underline-offset-4"
          href={props.event.eventUrl}
        >
          {props.event.title}
        </a>
      </Dynamic>
    </section>
  );
}
