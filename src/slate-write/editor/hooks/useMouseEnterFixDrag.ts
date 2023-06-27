import { MouseEvent, useCallback } from 'react';

export function useMouseEnterFixDrag() {
  const onMouseEnter = useCallback((_event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    /**
     * @url https://github.com/Jermolene/TiddlyWiki5/discussions/6627
     */
    $tw.dragInProgress = true;
  }, []);
  const onMouseLeave = useCallback((_event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    /**
     * @url https://github.com/Jermolene/TiddlyWiki5/discussions/6627
     */
    $tw.dragInProgress = false;
  }, []);
  return [onMouseEnter, onMouseLeave] as const;
}
