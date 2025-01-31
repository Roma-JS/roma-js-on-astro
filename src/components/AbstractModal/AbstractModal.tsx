import { Show, splitProps, type ComponentProps } from 'solid-js';
import { Modal } from '../Modal/Modal';
import type { CollectionEntry } from 'astro:content';
import type { L10nKey } from '@i18n/config';

type Messages<T extends L10nKey> = Partial<Record<T, string>>;

export interface AbstractModalProps
  extends Omit<ComponentProps<'dialog'>, 'id'> {
  abstract: CollectionEntry<'abstracts'>;
  messages: Messages<'talkSpeaker'>;
}

export function AbstractModal(props: AbstractModalProps) {
  const [local, otherProps] = splitProps(props, ['children', 'abstract']);
  return (
    <Modal
      {...otherProps}
      id={local.abstract.id}
      heading={local.abstract.data.title}
      preHeading={
        <aside>
          {props.messages.talkSpeaker}:{' '}
          <Show
            when={local.abstract.data.website}
            fallback={local.abstract.data.author}
          >
            <a
              class="link"
              target="_blank"
              rel="noopener noreferrer"
              href={local.abstract.data.website}
            >
              {local.abstract.data.author}
            </a>
          </Show>
        </aside>
      }
    >
      {local.children}
    </Modal>
  );
}
