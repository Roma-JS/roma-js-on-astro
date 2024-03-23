import type { Lang } from '@i18n/types';
import type { JSX } from 'solid-js/jsx-runtime';
import styles from '../styles.module.scss';
import { formatDate } from '@i18n/date-time';
import type { MeetupEventType } from '@api/meetup/event.graqhql.types';

export interface ScheduleEventProps {
  event: MeetupEventType;
  lang: Lang;
}

export function ScheduledEvent(props: ScheduleEventProps): JSX.Element {
  return (
    <section class={styles.event}>
      <time datetime={new Date(props.event.dateTime).toISOString()}>
        {formatDate(props.lang, new Date(props.event.dateTime))}
      </time>
      <h3 class={styles.eventHeading}>
        <a href={props.event.eventUrl}>{props.event.title}</a>
      </h3>
    </section>
  );
}
