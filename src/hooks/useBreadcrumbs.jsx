import { Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Custom hook to generate breadcrumbs based on the current location.
 * @returns {Array} An array of objects representing each breadcrumb.
 */
const useBreadcrumbs = () => {
  // Get the current location
  const location = useLocation();

  // Generate the breadcrumbs based on the location pathname
  return React.useMemo(() => {
    const pathElements = location.pathname.split('/').filter(Boolean);
    // Map each path element to a breadcrumb object
    return pathElements.map((pathElement, index) => {
      // Generate the path for the breadcrumb
      const path = `/${pathElements.slice(0, index + 1).join('/')}`;

      return {
        // Set the path for the breadcrumb
        path,
        // Indicate if it is the last breadcrumb
        isLast: index === pathElements.length - 1,
        // Set the content for the breadcrumb
        content: (
          <React.Fragment key={path}>
            {/* If it is not the first breadcrumb, add a navigate link */}
            {index !== 0 && <Navigate to={path} />}
            {/* If it is the last breadcrumb, show the text */}
            {index === pathElements.length - 1 ? (
              <Typography color='text.primary'>{pathElement}</Typography>
            ) : (
              <Link underline='hover' color='inherit' to={path}>
                {pathElement}
              </Link>
            )}
          </React.Fragment>
        ),
      };
    });
  }, [location]);
};

export default useBreadcrumbs
