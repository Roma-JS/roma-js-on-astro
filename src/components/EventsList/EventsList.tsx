import type { JSX } from 'solid-js/jsx-runtime';
import { For, Show } from 'solid-js';
import type { Lang } from '@i18n/types';
import type { UpcomingEvent } from 'utils/meetup-events';
import {
  PlaceholderEvent,
  type PlaceholderEventMessages,
} from './components/PlaceholderEvent';
import { ScheduledEvent } from './components/ScheduledEvent';

export interface EventsListProps {
  events?: UpcomingEvent[];
  lang: Lang;
  placeholderMessages: PlaceholderEventMessages;
}

export function EventsList(props: EventsListProps): JSX.Element {
  return (
    <ul class="m-0 grid list-none gap-x-6 gap-y-10 p-0 sm:grid-cols-2">
      <For each={props.events}>
        {(event) => (
          <>
            <Show when={event.type === 'placeholder' && event.date}>
              {(placeholderDate) => (
                <li class="contents">
                  <PlaceholderEvent
                    lang={props.lang}
                    date={placeholderDate()}
                    messages={props.placeholderMessages}
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
