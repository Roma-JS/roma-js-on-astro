import styles from './styles.module.scss';

export interface SkipToMainContentProps {
  targetId: string;
  label: string;
}

export function SkipToMainContent(props: SkipToMainContentProps) {
  const handleClick = () => {
    document.getElementById(props.targetId)?.focus();
  };

  return (
    <button
      type="button"
      classList={{
        [styles.root]: true,
        'btn btn-secondary h-1 visually-hidden-focusable': true,
      }}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
}
