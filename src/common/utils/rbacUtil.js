const normalizeList = (value) => (Array.isArray(value) ? value : []);

/** Backend may send `role: { role_name }` or a flat `role_name` on the user. */
export const getUserRoleName = (user) => {
  if (!user) return "";
  const raw = user.role?.role_name ?? user.role_name;
  return raw != null ? String(raw).toLowerCase() : "";
};

export const userHasRoleContext = (user) =>
  !!(user?.role ?? user?.role_name ?? getUserRoleName(user));

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    permissions: normalizeList(user.permissions),
    roles: normalizeList(user.roles),
  };
};

const isSuperAdmin = (user) => getUserRoleName(user) === "super_admin";

const can = (user, permissionCode) => {
  if (!userHasRoleContext(user)) return false;
  if (isSuperAdmin(user)) return true;
  const normalizedUser = normalizeUser(user);
  if (!normalizedUser) return false;
  return normalizeList(normalizedUser.permissions).includes(permissionCode);
};

const canAny = (user, permissions = []) => {
  if (!userHasRoleContext(user)) return false;
  if (isSuperAdmin(user)) return true;
  const list = normalizeList(permissions);
  if (list.length === 0) return true;
  return list.some((permission) => can(user, permission));
};

const canAll = (user, permissions = []) => {
  if (!userHasRoleContext(user)) return false;
  if (isSuperAdmin(user)) return true;
  const list = normalizeList(permissions);
  if (list.length === 0) return true;
  return list.every((permission) => can(user, permission));
};

const hasRole = (user, role) => {
  if (!userHasRoleContext(user)) return false;
  if (isSuperAdmin(user)) return true;
  const normalizedUser = normalizeUser(user);
  if (!normalizedUser) return false;

  if (typeof role === "string") {
    return normalizeList(normalizedUser.roles).includes(role);
  }

  if (Number.isInteger(role)) {
    return normalizedUser.role_id === role;
  }

  return false;
};

const hasAnyRole = (user, roles = []) => {
  if (!userHasRoleContext(user)) return false;
  if (isSuperAdmin(user)) return true;
  const list = normalizeList(roles);
  if (list.length === 0) return true;
  return list.some((role) => hasRole(user, role));
};

const hasAllRoles = (user, roles = []) => {
  if (!userHasRoleContext(user)) return false;
  const list = normalizeList(roles);
  if (list.length === 0) return true;
  return list.every((role) => hasRole(user, role));
};

export {
  can,
  canAny,
  canAll,
  hasRole,
  hasAnyRole,
  hasAllRoles,
  normalizeUser,
  isSuperAdmin,
};
