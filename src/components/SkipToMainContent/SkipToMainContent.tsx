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
      class="btn btn--ink visually-hidden-focusable fixed left-1 top-1 z-50"
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
}
