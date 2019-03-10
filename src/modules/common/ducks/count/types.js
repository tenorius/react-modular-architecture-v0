/**
 * The types file contains the names of the actions that you are dispatching in
 * your application. As a good practice, you should try to scope the names based
 * on the feature they belong to. This helps when debugging more complex
 * applications.
 */

const createActionName = name => `common/count/${name}`;

export const COUNT_ADD = createActionName('COUNT_ADD');
export const COUNT_SUB = createActionName('COUNT_SUB');
