import { type JSX, Show, type JSXElement } from 'solid-js';
import { splitProps } from 'solid-js';
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
    <header
      class="flex items-center gap-5 border-b-3 border-ink bg-brand-yellow px-5 py-8 lg:gap-8 lg:px-16 lg:py-12"
      classList={classList()}
      {...otherProps}
    >
      <Show when={local.logoHref} fallback={props.children}>
        <a
          class="brutal-press inline-block no-underline outline-none focus-visible:outline-3 focus-visible:outline-brand-red"
          href={local.logoHref}
          aria-label={props.logoLabel}
        >
          {props.children}
        </a>
      </Show>

      <Dynamic
        component={local.heading}
        class="m-0 line-clamp-3 overflow-hidden text-xl font-bold uppercase leading-tight tracking-tight text-ink sm:line-clamp-2 sm:text-2xl lg:text-4xl"
        tabIndex={local.headingTabIndex}
        id={local.headingId}
      >
        {local.title}
      </Dynamic>
    </header>
  );
}
