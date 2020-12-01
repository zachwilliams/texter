import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "semantic-ui-css/semantic.min.css";

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </Router>
);

export default App;
