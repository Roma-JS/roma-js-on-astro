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
      class="h-min w-[min(80vw,720px)] border border-ink bg-paper p-0 text-ink backdrop:bg-ink/60"
      ref={dialogRef}
      id={local.id}
    >
      <article class="grid max-h-[80vh] w-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-3 overflow-x-hidden overflow-y-auto p-5 font-mono lg:p-6">
        <header class="flex items-start justify-between gap-3 border-b border-ink pb-3">
          <div class="flex flex-col gap-1">
            <p class="m-0 font-mono text-xs uppercase tracking-widest text-ink-soft">
              {local.preHeading}
            </p>
            <Dynamic
              component={local.headingElem ?? 'h2'}
              class="m-0 max-w-full font-mono text-xl font-bold leading-tight tracking-tight lg:text-2xl"
            >
              {local.heading}
            </Dynamic>
          </div>
          <button
            autofocus
            type="button"
            class="btn"
            aria-label="Close"
            onClick={() => {
              dialogRef?.close();
            }}
          >
            close
          </button>
        </header>
        <div class="prose-mono pt-2 font-mono text-sm leading-relaxed lg:text-[15px]">
          {local.children}
        </div>
      </article>
    </dialog>
  );
}
