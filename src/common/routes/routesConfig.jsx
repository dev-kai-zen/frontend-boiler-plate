import { Navigate } from "react-router-dom";
import { Home, Quiz } from "@mui/icons-material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import AppLayout from "../layouts/AppLayout";
import GoogleAuthPage from "../../modules/google-auth/pages/GoogleAuthPage";
import HomePage from "../../modules/home/pages/HomePage";
import { PERMISSIONS } from "../constants/permissions";

/**
 * Shell navigation: path, label, icon, access, and page element.
 * Drives both the sidebar and authenticated child routes under `AppLayout`.
 *
 * Per route leaf: use one of `permission`, `permissionAny` (OR), or `permissionAll` (AND).
 */
export const MENU_ITEMS = [
  {
    key: "home",
    path: "/home",
    label: "Home",
    icon: Home,
    permission: null,
    element: <HomePage />,
  },
  {
    key: "normal-route",
    path: "/normal-route",
    label: "Single Route",
    icon: AltRouteIcon,
    permission: null,
    element: <HomePage />,
  },
  {
    key: "sample-routes",
    label: "Sample",
    icon: AltRouteIcon,
    permission: null,
    children: [
      {
        // key: "mesh-assessment",
        // path: "/mesh-assessment",
        // label: "Assessment Training",
        // icon: School,
        // permission: PERMISSIONS.MESH.TAKE_EXAM,
        // element: <AssessmentTrainingPage />,
      },
      {
        key: "normal-route-2",
        path: "/normal-route-2",
        label: "Single Route 2",
        icon: AltRouteIcon,
        permission: null,
        element: <HomePage />,
      },
    ],
  },
];

/** Collect every menu leaf that has a route + page (nested children included). */
const menuItemsToChildRoutes = (items) => {
  return items.flatMap((item) => {
    const self =
      item.path && item.element
        ? [
            {
              path: item.path,
              element: item.element,
              ...(item.permission ? { permission: item.permission } : {}),
              ...(item.permissionAny?.length
                ? { permissionAny: item.permissionAny }
                : {}),
              ...(item.permissionAll?.length
                ? { permissionAll: item.permissionAll }
                : {}),
            },
          ]
        : [];
    const nested = item.children ? menuItemsToChildRoutes(item.children) : [];
    return [...self, ...nested];
  });
};

/** Routes not listed in the sidebar (deep links / flows). */
const EXTRA_PROTECTED_CHILD_ROUTES = [
  {
    // path: "/mesh/attempts/:attemptId",
    // element: <MeshQuizAttemptViewPage />,
    // permission: PERMISSIONS.MESH.TAKE_EXAM,
  },
];

const routesConfig = [
  {
    path: "/login",
    element: <GoogleAuthPage />,
    protected: false,
  },
  {
    element: <AppLayout />,
    protected: true,
    children: [
      ...menuItemsToChildRoutes(MENU_ITEMS),
      ...EXTRA_PROTECTED_CHILD_ROUTES,
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    protected: false,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
    protected: false,
  },
];

export default routesConfig;
