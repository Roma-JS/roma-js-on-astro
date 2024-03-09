import type { Lang } from '@i18n/types';
import styles from '../styles.module.scss';
import { formatDate } from '@i18n/date-time';
import { CFPCta } from '@components/CFPCta/CFPCta';
import type { JSX } from 'solid-js/jsx-runtime';

export interface PlaceholderEventProps {
  date: Date;
  lang: Lang;
}

export function PlaceholderEvent(props: PlaceholderEventProps): JSX.Element {
  return (
    <section class={styles.event}>
      <time datetime={props.date.toISOString()}>
        {formatDate(props.lang, props.date)}
      </time>
      <h3 class={styles.eventHeading}>
        TBD <CFPCta />
      </h3>
    </section>
  );
}
