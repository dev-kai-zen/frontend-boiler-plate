import AccessDeniedView from "../components/AccessDeniedView";
import useAuthStore from "../store/authStore";
import { can, canAll, canAny } from "../utils/rbacUtil";

/**
 * Wraps a route element: if the user lacks the declared permission(s), renders
 * access-denied UI instead of the page (same behavior as menu filtering + deep links).
 *
 * Use one of: `permission`, `permissionAny` (OR), or `permissionAll` (AND).
 */
const RequirePermission = ({
  permission,
  permissionAny,
  permissionAll,
  message = "You do not have permission to view this page.",
  children,
}) => {
  const user = useAuthStore((s) => s.user);

  const allowed = (() => {
    if (permissionAll?.length) return canAll(user, permissionAll);
    if (permissionAny?.length) return canAny(user, permissionAny);
    if (permission) return can(user, permission);
    return true;
  })();

  if (!allowed) {
    return <AccessDeniedView message={message} />;
  }

  return children;
};

export default RequirePermission;
