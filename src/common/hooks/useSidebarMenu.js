import { useState, useMemo, useCallback, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { MENU_ITEMS } from "../routes/routesConfig";
import { getMenuKeysOpenForPathname } from "../utils/sidebarMenuUtil";

export const useSidebarMenu = () => {
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  /* Open parent groups (e.g. Administration) before paint so nested links stay visible. useEffect runs too late and Collapse looked "stuck" closed on /data-management/... */
  useLayoutEffect(() => {
    const toOpen = getMenuKeysOpenForPathname(MENU_ITEMS, pathname);
    setOpenMenus((prev) => ({ ...prev, ...toOpen }));
  }, [pathname]);

  const resolvedMenuItems = useMemo(() => MENU_ITEMS, []);

  const handleToggle = useCallback((key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return {
    resolvedMenuItems,
    effectiveOpenMenus: openMenus,
    handleToggle,
  };
};
