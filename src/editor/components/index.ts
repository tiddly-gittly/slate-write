import { CONFIG } from '../config/config';
import { withStyledDraggables } from '../config/withStyledDraggables';
import { withStyledPlaceHolders } from '../config/withStyledPlaceHolders';

export const components = withStyledDraggables(withStyledPlaceHolders(CONFIG.components));
