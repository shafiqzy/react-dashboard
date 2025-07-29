import { Route, Switch } from "wouter";
import { ButtonPage } from "./LazyPages";

export default function PageRoutes() {
  return (
    <Switch>
      <Route path="/">
        <ButtonPage />
      </Route>
    </Switch>
  );
}
