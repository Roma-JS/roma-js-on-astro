import type { Lang } from '@i18n/types';
import type { JSX } from 'solid-js/jsx-runtime';
import styles from '../styles.module.scss';
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
    <section class={styles.event}>
      <time datetime={new Date(props.event.dateTime).toISOString()}>
        {formatDate(props.lang, new Date(props.event.dateTime))}
      </time>
      <Dynamic
        component={props.heading ?? defaultHeading}
        class={styles.eventHeading}
      >
        <a href={props.event.eventUrl}>{props.event.title}</a>
      </Dynamic>
    </section>
  );
}
