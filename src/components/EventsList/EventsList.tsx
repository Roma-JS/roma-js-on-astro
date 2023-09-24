import type { JSX } from 'solid-js/jsx-runtime';
import styles from './styles.module.scss';
import type { MeetupEventType } from '@api/meetup/event.graqhql.types';
import { For } from 'solid-js';
import { i18nLang } from '@i18n/config';
import type { Lang } from '@i18n/types';
import { CFPCta } from '@components/CFPCta/CFPCta';

export interface EventsListProps {
  data?: MeetupEventType[] | null;
  upcoming?: Date[];
  lang: Lang;
}

export function EventsList({
  data,
  upcoming,
  lang,
}: EventsListProps): JSX.Element {
  const startsAtFormatter = new Intl.DateTimeFormat(i18nLang[lang].locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Rome',
  });

  return (
    <ul class={styles.eventsList}>
      <For each={data}>
        {(event) => (
          <li>
            <section class={styles.event}>
              <time datetime={new Date(event.dateTime).toISOString()}>
                {startsAtFormatter.format(new Date(event.dateTime))}
              </time>
              <h3 class={styles.eventHeading}>
                <a href={event.eventUrl}>{event.title}</a>
              </h3>
            </section>
          </li>
        )}
      </For>
      <For each={upcoming}>
        {(event) => (
          <li>
            <section class={styles.event}>
              <time datetime={new Date(event).toISOString()}>
                {startsAtFormatter.format(new Date(event))}
              </time>
              <h3 class={styles.eventHeading}>
                TBD <CFPCta />
              </h3>
            </section>
          </li>
        )}
      </For>
    </ul>
  );
}
