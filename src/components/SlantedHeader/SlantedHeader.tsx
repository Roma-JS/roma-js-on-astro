import { type JSX, Show, type JSXElement } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './styles.module.scss';
import { Dynamic } from 'solid-js/web';

export type SlantedHeaderProps = JSX.IntrinsicElements['header'] & {
  title: string;
  logoHref?: string;
  logoLabel?: string;
  children: JSXElement;
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingId?: string;
  headingTabIndex?: string;
};

export function SlantedHeader(props: SlantedHeaderProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'title',
    'children',
    'class',
    'classList',
    'logoHref',
    'logoLabel',
    'heading',
    'headingId',
    'headingTabIndex',
  ]);

  const classList = () => {
    const output = { ...local.classList };

    if (local.class) {
      output[local.class] = true;
    }

    return output;
  };

  return (
    <header class={styles.header} classList={classList()} {...otherProps}>
      <Show when={local.logoHref} fallback={props.children}>
        <a
          class={styles.logoLink}
          href={local.logoHref}
          aria-label={props.logoLabel}
        >
          {props.children}
        </a>
      </Show>

      <Dynamic
        component={local.heading}
        class="h-1"
        tabIndex={local.headingTabIndex}
        id={local.headingId}
        classList={{ [styles.heading]: true }}
      >
        {local.title}
      </Dynamic>
    </header>
  );
}
