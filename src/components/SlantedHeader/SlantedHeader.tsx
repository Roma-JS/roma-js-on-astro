import { type JSX, Show, type JSXElement } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type SlantedHeaderProps = JSX.IntrinsicElements['header'] & {
  title: string;
  eyebrow?: string;
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
    'eyebrow',
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
      class="border-b border-ink bg-brand-yellow text-black"
      classList={classList()}
      {...otherProps}
    >
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
        <div class="flex items-center gap-4">
          <Show when={local.logoHref}>
            <a
              class="inline-flex shrink-0 text-black no-underline hover:bg-transparent hover:text-black"
              href={local.logoHref}
              aria-label={props.logoLabel}
            >
              {props.children}
            </a>
          </Show>
          <p class="m-0 font-mono text-xs uppercase tracking-widest text-black/60">
            {local.eyebrow ?? '// page'}
          </p>
        </div>
        <Dynamic
          component={local.heading}
          class="m-0 max-w-4xl font-mono text-3xl font-bold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-5xl"
          tabIndex={local.headingTabIndex}
          id={local.headingId}
        >
          {local.title}
        </Dynamic>
      </div>
    </header>
  );
}
