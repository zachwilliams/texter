import React from "react";
import store from "store";
import { Sidebar, Menu, Icon, Container, Tab } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import { isLoggedIn } from "../services/Helper";

const panes = [
  {
    menuItem: "Tab 1",
    render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
  },
  {
    menuItem: "Tab 2",
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
  },
  {
    menuItem: "Tab 3",
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
  },
];

const handleLogout = (history) => () => {
  store.remove("loggedIn");
  history.push("/login");
};

const handleHome = (history) => () => {
  history.push("/");
};

const Dashboard = ({ history }) => {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        <Menu.Item name="home" onClick={handleHome(history)}>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item name="logout" onClick={handleLogout(history)}>
          <Icon name="power" />
          Logout
        </Menu.Item>
      </Sidebar>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Container>
  );
};

export default Dashboard;
