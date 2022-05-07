/**
 * Get new direction if updated
 */
export const getNewDirection = (previousDirection: string, direction?: string) => {
  if (!direction && previousDirection) {
    return '';
  }

  if (direction === 'top' && previousDirection !== 'top') {
    return 'top';
  }

  if (direction === 'bottom' && previousDirection !== 'bottom') {
    return 'bottom';
  }
  return '';
};
