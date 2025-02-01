import {
  type ComponentProps,
  splitProps,
  createEffect,
  onCleanup,
  Show,
  type JSX,
} from 'solid-js';
import styles from './modal.module.scss';
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
      classList={{ [styles.modal]: true }}
      ref={dialogRef}
      id={local.id}
    >
      <button
        autofocus
        type="button"
        classList={{ 'btn btn-secondary': true }}
        class={styles.close}
        onClick={() => {
          dialogRef?.close();
        }}
      >
        &times;
      </button>
      <article class={styles.article}>
        <aside class={styles.aside}>{local.preHeading}</aside>
        <Dynamic component={local.headingElem ?? 'h2'} class={styles.heading}>
          {local.heading}
        </Dynamic>
        {local.children}
      </article>
    </dialog>
  );
}
