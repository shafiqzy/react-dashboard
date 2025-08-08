import { Route, Switch } from "wouter";
import { ButtonPage } from "./LazyPages";
import { ROUTES } from "src/constants/routes";
import BaseLayout from "src/components/Layout/BaseLayout";
import DashboardPage from "src/pages/Dashboard/DashboardPage";

export default function PageRoutes() {
  return (
    <BaseLayout>
      <Switch>
        <Route path={ROUTES.home}>
          <DashboardPage />
        </Route>
        <Route path={ROUTES.dashboard}>
          <DashboardPage />
        </Route>
        <Route path={ROUTES.button}>
          <ButtonPage />
        </Route>
      </Switch>
    </BaseLayout>
  );
}
