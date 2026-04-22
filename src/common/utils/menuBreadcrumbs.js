import { MENU_ITEMS } from "../routes/routesConfig";
import { normalizeMenuPathname } from "./sidebarMenuUtil";

const rootHomeMeta = () => {
  const rootNavItem = MENU_ITEMS.find((item) => item.key === "home");
  return {
    rootLabel: rootNavItem?.label ?? "Home",
    rootPath: rootNavItem?.path ?? "/home",
  };
};

const pathMatchesMenuLeaf = (itemPath, pathname) => {
  const base = normalizeMenuPathname(itemPath);
  const p = normalizeMenuPathname(pathname);
  return p === base || p.startsWith(`${base}/`);
};

/** @returns {object[] | null} Menu items from root group down to matching leaf. */
const findMenuTrail = (items, pathname) => {
  for (const item of items) {
    if (item.path && pathMatchesMenuLeaf(item.path, pathname)) {
      return [item];
    }
    if (item.children) {
      const sub = findMenuTrail(item.children, pathname);
      if (sub) return [item, ...sub];
    }
  }
  return null;
};

/**
 * @param {string} pathname — `location.pathname`
 * @returns {{ label: string, path: string | null, current: boolean }[]}
 */
export const getBreadcrumbSegments = (pathname) => {
  const { rootLabel, rootPath } = rootHomeMeta();
  const normalized = normalizeMenuPathname(pathname);

  const trail = findMenuTrail(MENU_ITEMS, normalized);
  if (!trail?.length) {
    return [
      { label: rootLabel, path: rootPath, current: normalized === rootPath },
    ];
  }

  const isRootOnly = trail.length === 1 && trail[0].path === rootPath;

  if (isRootOnly) {
    const [home] = trail;
    return [{ label: home.label, path: home.path, current: true }];
  }

  const segments = [
    { label: rootLabel, path: rootPath, current: false },
  ];

  for (let i = 0; i < trail.length; i++) {
    const item = trail[i];
    const isLast = i === trail.length - 1;
    segments.push({
      label: item.label,
      path: isLast ? null : item.path ?? null,
      current: isLast,
    });
  }

  return segments;
};
