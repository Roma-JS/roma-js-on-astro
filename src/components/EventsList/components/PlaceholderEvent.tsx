import type { Lang } from '@i18n/types';
import { formatDate } from '@i18n/date-time';
import { CFPCta } from '@components/CFPCta/CFPCta';
import type { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';

export interface PlaceholderEventProps {
  date: Date;
  lang: Lang;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const defaultHeading: NonNullable<PlaceholderEventProps['heading']> = 'h2';

export function PlaceholderEvent(props: PlaceholderEventProps): JSX.Element {
  return (
    <section class="grid grid-cols-1 items-center gap-4 border-3 border-ink bg-paper p-5 shadow-brutal md:grid-cols-[200px_1fr] md:p-6">
      <time
        datetime={props.date.toISOString()}
        class="font-bold uppercase tracking-widest text-ink-soft"
      >
        {formatDate(props.lang, props.date)}
      </time>
      <Dynamic
        component={props.heading ?? defaultHeading}
        class="m-0 flex flex-wrap items-center gap-3 text-xl font-bold uppercase text-ink"
      >
        TBD <CFPCta />
      </Dynamic>
    </section>
  );
}
