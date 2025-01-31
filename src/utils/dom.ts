export function isVieportPointInside<T extends Element>(
  element: T,
  viewportX: number,
  viewportY: number
) {
  const domRect = element.getBoundingClientRect();

  return (
    viewportY >= domRect.top &&
    viewportY <= domRect.top + domRect.height &&
    viewportX >= domRect.left &&
    viewportX <= domRect.left + domRect.width
  );
}
