import type { JSX } from 'solid-js/jsx-runtime';
import { For, Show } from 'solid-js';
import type { Lang } from '@i18n/types';
import type { UpcomingEvent } from 'utils/meetup-events';
import { PlaceholderEvent } from './components/PlaceholderEvent';
import { ScheduledEvent } from './components/ScheduledEvent';

export interface EventsListProps {
  events?: UpcomingEvent[];
  lang: Lang;
}

export function EventsList(props: EventsListProps): JSX.Element {
  return (
    <ul class="m-0 grid list-none gap-6 p-0">
      <For each={props.events}>
        {(event) => (
          <>
            <Show when={event.type === 'placeholder' && event.date}>
              {(placeholderDate) => (
                <li class="contents">
                  <PlaceholderEvent
                    lang={props.lang}
                    date={placeholderDate()}
                  />
                </li>
              )}
            </Show>
            <Show when={event.type === 'scheduled' && event.data}>
              {(scheduled) => (
                <li class="contents">
                  <ScheduledEvent lang={props.lang} event={scheduled()} />
                </li>
              )}
            </Show>
          </>
        )}
      </For>
    </ul>
  );
}
