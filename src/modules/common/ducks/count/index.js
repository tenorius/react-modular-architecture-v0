/**
 * This file specifies what gets exported from the duck folder.
 * It will:
 *   - export as default the reducer function of the duck.
 *   - export as named exports the selectors and the operations.
 *   - export the types if they are needed in other ducks.
 *   - Add reducers to the store on the go.
 */

import reducerRegistry from '../../services/reducerRegistry';

// Export reducers as default
import * as reducers from './reducers';

// Other entities as named exports
import * as selectors from './selectors';
import * as operations from './operations';
import * as actions from './actions';
import * as type from './types';

// Add the new reducers to the store
reducerRegistry.register();

export {
  selectors,
  operations,
  actions,
  type,
};

export default reducers;
