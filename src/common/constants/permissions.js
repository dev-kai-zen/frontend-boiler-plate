/**
 * Permission codes. Keep in sync with backend RBAC.
 */
export const PERMISSIONS = {
  USER: {
    LIST: "user:list",
    UPDATE: "user:update",
    DELETE: "user:delete",
  },
  ROLE: {
    CREATE: "role:create",
    LIST: "role:list",
    UPDATE: "role:update",
    DELETE: "role:delete",
  },
  PERMISSION: {
    CREATE: "permission:create",
    LIST: "permission:list",
    UPDATE: "permission:update",
    DELETE: "permission:delete",
  },
  PERMISSION_GROUP: {
    CREATE: "permission_group:create",
    LIST: "permission_group:list",
    UPDATE: "permission_group:update",
    DELETE: "permission_group:delete",
  },
  AUDIT: {
    USER_LOGS: "audit:view:user",
    ROLE_LOGS: "audit:view:role",
    VIEW_ALL: "audit:view:all",
  },
  APP_SETTINGS: {
    EDIT: "app_settings:edit",
  },
  MESH: {
    LIST: "mesh:list",
    CREATE: "mesh:create",
    UPDATE: "mesh:update",
    DELETE: "mesh:delete",
    EXPORT: "mesh:export",
    TAKE_EXAM: "mesh:take_exam",
    VIEW_BRANCH: "mesh:view_branch",
    VIEW_AREA: "mesh:view_area",
    VIEW_REGION: "mesh:view_region",
    VIEW_DIVISION: "mesh:view_division",
    VIEW_OPERATION: "mesh:view_operation",
    VIEW_DEPARTMENT: "mesh:view_department",
  },
  CONTENT_MANAGEMENT: {
    LIST: "content_management:list",
    CREATE: "content_management:create",
    UPDATE: "content_management:update",
    DELETE: "content_management:delete",
    EXPORT: "content_management:export",
    IMPORT: "content_management:import",
  },
  ANNOUNCEMENTS: {
    CREATE: "announcements:create",
    DELETE: "announcements:delete",
  },
};
