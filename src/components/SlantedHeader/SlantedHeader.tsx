import { type JSX, Show, type JSXElement } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './styles.module.scss';

export type SlantedHeaderProps = JSX.IntrinsicElements['header'] & {
  title: string;
  logoHref?: string;
  logoLabel?: string;
  children: JSXElement;
};

export function SlantedHeader(props: SlantedHeaderProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'title',
    'children',
    'class',
    'classList',
    'logoHref',
    'logoLabel',
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

      <h1 class="h-1" classList={{ [styles.heading]: true }}>
        {local.title}
      </h1>
    </header>
  );
}
