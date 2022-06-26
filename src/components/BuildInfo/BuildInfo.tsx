import type { JSX } from 'solid-js';
import { stringifyForJSONScript } from 'utils/html-escape';

export function BuildInfo(): JSX.Element {
  return (
    <script
      type="application/json"
      id="build-info"
      innerHTML={stringifyForJSONScript({
        commitId: import.meta.env.PUBLIC_COMMIT_ID,
        buildDate: import.meta.env.PUBLIC_BUILD_DATE,
      })}
    />
  );
}
