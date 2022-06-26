/**
 * Escapes input `jsToInline` in order to be safely interpolated as
 * without additional escaping.
 *
 * ```html
 * <script>{{{jsToInline}}}</script>
 * ```
 * without additional escaping.
 * @see https://mathiasbynens.be/notes/etago#html5
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-end-tag-open-state
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 */
export function escapeJsContentToInline(jsToInline: string): string {
  return jsToInline.replace(/<\//g, '<\\u002F').replace(/<!/g, '<\\u0021');
}

/**
 * Escapes input `cssToInline` in order to be safely interpolated as
 *
 * ```html
 * <style>{{{cssToInline}}}</style>
 * ```
 * without additional escaping.
 * @see https://mathiasbynens.be/notes/etago#html5
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-end-tag-open-state
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 */
export function escapeCssContentToInline(cssToInline: string): string {
  return cssToInline.replace(/<\//g, '<\\002F').replace(/<!/g, '<\\0021');
}

/**
 * Serialize input and escapes its string representation in order to be safely interpolated as
 * ```html
 * <script type="application/json">{{{jsValueToSerialize}}}</script>
 * ````
 * without additional escaping.
 * @see https://mathiasbynens.be/notes/etago#html5
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-end-tag-open-state
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 */
export function stringifyForJSONScript(jsValueToSerialize: unknown): string {
  return escapeJsContentToInline(JSON.stringify(jsValueToSerialize));
}
