import {
  type ComponentProps,
  splitProps,
  createEffect,
  onCleanup,
  type JSX,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { isVieportPointInside } from 'utils/dom';

export interface ModalProps extends Omit<ComponentProps<'dialog'>, 'id'> {
  id: string;
  heading: string;
  headingElem?: 'h2' | 'h3' | 'h4' | 'h5' | 'h5';
  preHeading?: JSX.Element;
}

export function Modal(props: ModalProps) {
  const [local, otherProps] = splitProps(props, [
    'children',
    'id',
    'headingElem',
    'heading',
    'preHeading',
  ]);
  let dialogRef: HTMLDialogElement | undefined;

  function handleModalStateChange(this: HTMLDialogElement) {
    document.documentElement.classList.toggle('overflow-hidden', this.open);
  }

  const handleWindowClick = ({ target }: MouseEvent) => {
    if (!(target instanceof Element) || !dialogRef) {
      return;
    }
    if (
      target.getAttribute('data-modal') === local.id &&
      !dialogRef.contains(target)
    ) {
      dialogRef.showModal();
      handleModalStateChange.call(dialogRef);
    }
  };

  const handleDialogClick = ({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent & { currentTarget: HTMLDialogElement }) => {
    if (!isVieportPointInside(currentTarget, clientX, clientY)) {
      currentTarget.close();
    }
  };

  createEffect(() => {
    window.addEventListener('click', handleWindowClick);
    dialogRef?.addEventListener('close', handleModalStateChange);
    onCleanup(() => {
      window.removeEventListener('click', handleWindowClick);
      dialogRef?.removeEventListener('close', handleModalStateChange);
    });
  });

  return (
    <dialog
      {...otherProps}
      onClick={handleDialogClick}
      class="brutal-modal h-min w-[min(80vw,720px)] border-3 border-ink bg-paper p-0 text-ink shadow-brutal-lg backdrop:bg-ink/60"
      ref={dialogRef}
      id={local.id}
    >
      <button
        autofocus
        type="button"
        class="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center border-3 border-ink bg-paper text-2xl font-bold leading-none text-ink shadow-brutal-sm hover:bg-brand-red hover:text-paper"
        aria-label="Close"
        onClick={() => {
          dialogRef?.close();
        }}
      >
        &times;
      </button>
      <article class="grid max-h-[80vh] w-full grid-cols-1 grid-rows-[auto_auto_1fr] overflow-x-hidden overflow-y-auto p-6 lg:p-8">
        <aside class="m-0 flex max-w-[calc(100%-1.2rem)] min-h-8 items-center overflow-hidden text-sm font-bold uppercase tracking-widest text-ink-soft">
          {local.preHeading}
        </aside>
        <Dynamic
          component={local.headingElem ?? 'h2'}
          class="m-0 mb-4 flex max-w-full min-h-10 items-center overflow-hidden text-2xl font-bold uppercase tracking-tight text-ink"
        >
          {local.heading}
        </Dynamic>
        {local.children}
      </article>
    </dialog>
  );
}
