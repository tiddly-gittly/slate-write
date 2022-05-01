import { createPlateUI } from '@udecode/plate';
import { withStyledDraggables } from './withStyledDraggables';
import { withStyledPlaceHolders } from './withStyledPlaceHolders';

export const components = withStyledDraggables(withStyledPlaceHolders(createPlateUI()));
