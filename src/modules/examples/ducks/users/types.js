/**
 * The types file contains the names of the actions that you are dispatching in
 * your application. As a good practice, you should try to scope the names based
 * on the feature they belong to. This helps when debugging more complex
 * applications.
 */

const createActionName = name => `examples/users/${name}`;

// eslint-disable-next-line import/prefer-default-export
export const ADD_USERS = createActionName('ADD_USERS');
