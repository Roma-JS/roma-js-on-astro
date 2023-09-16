import { type JSX, Show } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './styles.module.scss';
import logoSvg from 'media/brand-logo/primary.svg';

export type SlantedHeaderProps = JSX.IntrinsicElements['header'] & {
  title: string;
  logoHref?: string;
  logoLabel?: string;
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

  const imageLogo = () => (
    <img
      src={logoSvg.src}
      alt={'Romajs logo'}
      class={styles.logo}
      aria-hidden="true"
    />
  );

  return (
    <header class={styles.header} classList={classList()} {...otherProps}>
      <Show when={local.logoHref} fallback={imageLogo()}>
        <a
          class={styles.logoLink}
          href={local.logoHref}
          aria-label={props.logoLabel}
        >
          {imageLogo()}
        </a>
      </Show>

      <h1 class="h-1" classList={{ [styles.heading]: true }}>
        {local.title}
      </h1>
    </header>
  );
}
