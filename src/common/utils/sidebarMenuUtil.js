import {
  can,
  canAll,
  canAny,
  getUserRoleName,
  userHasRoleContext,
} from "./rbacUtil";

export const normalizeMenuPathname = (pathname) => {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

/** True if `item` is the route leaf or contains a descendant with `path` === pathname. */
export const itemOrDescendantMatchesPath = (item, pathname) => {
  const p = normalizeMenuPathname(pathname);
  if (item.path) {
    const base = normalizeMenuPathname(item.path);
    if (p === base || p.startsWith(`${base}/`)) return true;
  }
  if (item.children) {
    return item.children.some((c) => itemOrDescendantMatchesPath(c, p));
  }
  return false;
};

/** Parent `key`s that should be expanded so the active route’s leaf is reachable. */
export const getMenuKeysOpenForPathname = (items, pathname) => {
  const out = {};
  const walk = (list) => {
    for (const item of list) {
      if (!item.children?.length) continue;
      const hit = item.children.some((c) =>
        itemOrDescendantMatchesPath(c, pathname),
      );
      if (hit) {
        out[item.key] = true;
        walk(item.children);
      }
    }
  };
  walk(items);
  return out;
};

export const hasPermission = (item, user) => {
  if (getUserRoleName(user) === "super_admin") return true;
  if (!userHasRoleContext(user)) return false;
  if (item.permissionAll && Array.isArray(item.permissionAll)) {
    return canAll(user, item.permissionAll);
  }
  if (item.permissionAny && Array.isArray(item.permissionAny)) {
    return canAny(user, item.permissionAny);
  }
  return !item.permission || can(user, item.permission);
};

export const hasVisibleDescendant = (item, user) => {
  if (getUserRoleName(user) === "super_admin") return true;
  if (!userHasRoleContext(user)) return false;
  if (item.path) {
    return hasPermission(item, user);
  }
  if (item.children) {
    return item.children.some((child) => hasVisibleDescendant(child, user));
  }
  return false;
};
