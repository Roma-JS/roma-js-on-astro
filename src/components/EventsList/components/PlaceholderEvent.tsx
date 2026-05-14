import type { Lang } from '@i18n/types';
import { formatDate } from '@i18n/date-time';
import { CFPCta } from '@components/CFPCta/CFPCta';
import type { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';

export interface PlaceholderEventMessages {
  topicTbd: string;
  submitTalk: string;
}

export interface PlaceholderEventProps {
  date: Date;
  lang: Lang;
  messages: PlaceholderEventMessages;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const defaultHeading: NonNullable<PlaceholderEventProps['heading']> = 'h2';

export function PlaceholderEvent(props: PlaceholderEventProps): JSX.Element {
  return (
    <section class="ascii-box flex flex-col gap-4">
      <span class="ascii-box__title">TBD</span>
      <span class="ascii-box__meta">
        <time datetime={props.date.toISOString()}>
          {formatDate(props.lang, props.date)}
        </time>
      </span>
      <Dynamic
        component={props.heading ?? defaultHeading}
        class="m-0 font-mono text-lg font-bold leading-tight tracking-tight lg:text-xl"
      >
        {props.messages.topicTbd}
      </Dynamic>
      <div class="mt-auto">
        <CFPCta class="btn--primary">{props.messages.submitTalk}</CFPCta>
      </div>
    </section>
  );
}
