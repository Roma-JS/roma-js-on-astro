import type { Lang } from '@i18n/types';
import styles from '../styles.module.scss';
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
    <section class={styles.event}>
      <time datetime={props.date.toISOString()}>
        {formatDate(props.lang, props.date)}
      </time>
      <Dynamic
        component={props.heading ?? defaultHeading}
        class={styles.eventHeading}
      >
        TBD <CFPCta />
      </Dynamic>
    </section>
  );
}
