import { splitProps, type JSX } from 'solid-js';

export function CFPCta(props: Omit<JSX.IntrinsicElements['a'], 'href'>) {
  const [local, otherProps] = splitProps(props, [
    'class',
    'classList',
    'children',
  ]);

  const classList = () => {
    const output: Record<string, boolean> = {
      'btn btn--primary': true,
      ...local.classList,
    };

    if (local.class) {
      output[local.class] = true;
    }

    return output;
  };

  return (
    <a
      {...otherProps}
      classList={classList()}
      rel="noopener noreferrer"
      target="_blank"
      href={import.meta.env.PUBLIC_CFP_FORM_HREF}
    >
      {local.children ?? 'CFP Open'}
      <span aria-hidden="true">→</span>
    </a>
  );
}
