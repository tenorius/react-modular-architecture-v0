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
import * as duckSelectors from './selectors';
import * as duckOperations from './operations';
import * as duckActions from './actions';
import * as duckType from './types';

// Add the new reducers to the store
reducerRegistry.register();

export {
  duckSelectors,
  duckOperations,
  duckActions,
  duckType,
};

export default reducers;
