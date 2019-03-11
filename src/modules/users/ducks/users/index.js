/**
 * This file specifies what gets exported from the duck folder.
 * It will:
 *   - export as default the reducer function of the duck.
 *   - export as named exports the selectors and the operations.
 *   - export the types if they are needed in other ducks.
 *   - Add reducers to the store on the go.
 */

import reducerRegistry from '../../../common/services/reducerRegistry';

// Export reducers as default
import * as reducers from './reducers';

// Other entities as named exports
import * as operations from './operations';
import * as actions from './actions';
import * as types from './types';

// Add the new reducers to the store
reducerRegistry.register();

export {
  operations,
  actions,
  types,
};

export default reducers;
