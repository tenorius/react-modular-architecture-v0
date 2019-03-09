import { schema } from 'normalizr';

const permission = new schema.Entity('permissions');
const arrayOfPermissions = { permissions: [permission] };

export {
  permission,
  arrayOfPermissions,
};
