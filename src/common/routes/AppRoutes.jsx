import React from "react";
import { Route, Routes } from "react-router-dom";
import routesConfig from "./routesConfig";
import RequireAuth from "./RequireAuth";
import RequirePermission from "./RequirePermission";

const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const {
      path,
      element,
      children,
      protected: isProtected,
      permission,
      permissionAny,
      permissionAll,
    } = route;

    let pageElement = element;
    if (
      permission != null ||
      (permissionAny != null && permissionAny.length > 0) ||
      (permissionAll != null && permissionAll.length > 0)
    ) {
      pageElement = (
        <RequirePermission
          permission={permission}
          permissionAny={permissionAny}
          permissionAll={permissionAll}
        >
          {element}
        </RequirePermission>
      );
    }

    let routeNode = (
      <Route key={`inner-${index}`} path={path} element={pageElement}>
        {children && renderRoutes(children)}
      </Route>
    );

    if (isProtected) {
      routeNode = <Route element={<RequireAuth />}>{routeNode}</Route>;
    }

    return React.cloneElement(routeNode, { key: index });
  });
};

const AppRoutes = () => {
  return <Routes>{renderRoutes(routesConfig)}</Routes>;
};

export default AppRoutes;
