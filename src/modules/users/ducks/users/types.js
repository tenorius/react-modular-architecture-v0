/**
 * The types file contains the names of the actions that you are dispatching in
 * your application. As a good practice, you should try to scope the names based
 * on the feature they belong to. This helps when debugging more complex
 * applications.
 */

const createActionName = name => `users/users/${name}`;

// eslint-disable-next-line import/prefer-default-export
export const GET_ALL_USERS = createActionName('GET_ALL_USERS');
