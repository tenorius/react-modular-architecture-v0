/**
 * Together with the operations, the selectors are part of the public interface
 * of a duck. The split between operations and selectors resembles the CQRS
 * pattern.
 *
 * Selector functions take a slice of the application state and return some data
 * based on that. They never introduce any changes to the application state.
 */

// eslint-disable-next-line import/prefer-default-export
export function fooBar(foo) {
  return foo === 'bar';
}
