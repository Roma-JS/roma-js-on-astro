import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './styles.module.scss';
import logoSvg from 'media/brand-logo/primary.svg';

export type SlantedHeaderProps = JSX.IntrinsicElements['header'] & {
  title: string;
};

export function SlantedHeader(props: SlantedHeaderProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'title',
    'children',
    'class',
    'classList',
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
      <h1 class="h-1" classList={{ [styles.heading]: true }}>
        {local.title}
      </h1>
      <img src={logoSvg} alt={'romajsLogo'} class={styles.logo} />
    </header>
  );
}
