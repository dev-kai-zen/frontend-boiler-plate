export const formatRoleDisplay = (roleName) => {
  if (!roleName || typeof roleName !== "string") return "";

  return roleName
    .replace(/_/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
