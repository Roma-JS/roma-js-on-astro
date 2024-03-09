import type { JSX } from 'solid-js/jsx-runtime';
import styles from './styles.module.scss';
import { For, Show } from 'solid-js';
import type { Lang } from '@i18n/types';
import { CFPCta } from '@components/CFPCta/CFPCta';
import { formatDate } from '@i18n/date-time';
import type { UpcomingEvent } from 'utils/meetup-events';

export interface EventsListProps {
  events?: UpcomingEvent[];
  lang: Lang;
}

export function EventsList({ events, lang }: EventsListProps): JSX.Element {
  return (
    <ul class={styles.eventsList}>
      <For each={events}>
        {(event) => (
          <>
            <Show when={event.type === 'placeholder' && event.date}>
              {(placeholderDate) => (
                <li>
                  <section class={styles.event}>
                    <time datetime={placeholderDate().toISOString()}>
                      {formatDate(lang, placeholderDate())}
                    </time>
                    <h3 class={styles.eventHeading}>
                      TBD <CFPCta />
                    </h3>
                  </section>
                </li>
              )}
            </Show>
            <Show when={event.type === 'scheduled' && event.data}>
              {(scheduled) => (
                <li>
                  <section class={styles.event}>
                    <time
                      datetime={new Date(scheduled().dateTime).toISOString()}
                    >
                      {formatDate(lang, new Date(scheduled().dateTime))}
                    </time>
                    <h3 class={styles.eventHeading}>
                      <a href={scheduled().eventUrl}>{scheduled().title}</a>
                    </h3>
                  </section>
                </li>
              )}
            </Show>
          </>
        )}
      </For>
    </ul>
  );
}
