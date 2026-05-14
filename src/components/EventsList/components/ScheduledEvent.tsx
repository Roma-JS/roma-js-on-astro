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
    <section class="ascii-box flex flex-col gap-4 transition-colors hover:bg-paper-soft">
      <span class="ascii-box__title">EVENT</span>
      <span class="ascii-box__meta">
        <time datetime={new Date(props.event.dateTime).toISOString()}>
          {formatDate(props.lang, new Date(props.event.dateTime))}
        </time>
      </span>
      <Dynamic
        component={props.heading ?? defaultHeading}
        class="m-0 font-mono text-lg font-bold leading-tight tracking-tight lg:text-xl"
      >
        <a href={props.event.eventUrl}>{props.event.title}</a>
      </Dynamic>
    </section>
  );
}
