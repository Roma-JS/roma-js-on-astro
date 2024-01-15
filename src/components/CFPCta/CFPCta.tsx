import { splitProps, type JSX } from 'solid-js';
import styles from './cfpCta.module.scss';

export function CFPCta(props: Omit<JSX.IntrinsicElements['a'], 'href'>) {
  const [local, otherProps] = splitProps(props, [
    'class',
    'classList',
    'children',
  ]);

  const classList = () => {
    const output = { ...local.classList };

    if (local.class) {
      output[local.class] = true;
    }

    return output;
  };

  return (
    <a
      {...otherProps}
      class={styles.cta}
      classList={classList()}
      rel="noopener noreferrer"
      target="_blank"
      href={import.meta.env.PUBLIC_CFP_FORM_HREF}
    >
      {local.children ?? 'CFP Open '}
    </a>
  );
}
