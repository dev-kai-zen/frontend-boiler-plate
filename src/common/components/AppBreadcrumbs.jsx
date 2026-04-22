import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getBreadcrumbSegments } from "../utils/menuBreadcrumbs";
import { themeTokens } from "../theme/themeTokens";

const AppBreadcrumbs = () => {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbSegments(pathname);

  return (
    <Breadcrumbs
      aria-label="Breadcrumb"
      sx={{
        flexShrink: 1,
        minWidth: 0,
        "& .MuiBreadcrumbs-li": {
          maxWidth: "100%",
        },
        "& .MuiTypography-root": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    >
      {crumbs.map((crumb, i) => {
        const key = `${crumb.label}-${i}`;
        if (crumb.current) {
          return (
            <Typography
              key={key}
              color={themeTokens.brand.primary}
              variant="body2"
              component="span"
              sx={(theme) => ({
                fontWeight: theme.typography.fontWeightBold,
              })}
            >
              {crumb.label}
            </Typography>
          );
        }
        if (crumb.path) {
          return (
            <Link
              key={key}
              component={RouterLink}
              to={crumb.path}
              color="inherit"
              underline="hover"
              variant="body2"
            >
              {crumb.label}
            </Link>
          );
        }
        return (
          <Typography
            key={key}
            color="text.secondary"
            variant="body2"
            component="span"
          >
            {crumb.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
