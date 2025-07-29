import { lazy } from "react";

export const ButtonPage = lazy(() =>
  import("src/pages/Button/ButtonPage").then((module) => ({
    default: module.default,
  }))
);
