import { createPlateUI } from '@udecode/plate';
import { CONFIG } from '../config/config';
import { withStyledDraggables } from './withStyledDraggables';
import { withStyledPlaceHolders } from './withStyledPlaceHolders';

export const components = withStyledDraggables(withStyledPlaceHolders(CONFIG.components));
