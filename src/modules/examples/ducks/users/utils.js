import { normalize, schema } from 'normalizr';

// eslint-disable-next-line import/prefer-default-export
export function normalizeUsers(users) {
  // Define the entities
  const company = new schema.Entity('company', {}, {
    idAttribute: value => `id@${value.name}`,
  });
  const address = new schema.Entity('address', {}, {
    idAttribute: value => `id@${value.zipcode}`,
  });
  const user = new schema.Entity('user', {
    company,
    address,
  });
  // Define the data schema
  const dataSchema = [user];

  return normalize(users, dataSchema);
}
