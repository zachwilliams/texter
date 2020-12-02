import React from "react";
import store from "store";
import {
  Form,
  Button,
  Message,
  Grid,
  Header,
  Segment,
  GridRow,
  GridColumn,
  Icon,
} from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";

import { isLoggedIn } from "../services/Helper";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    // TODO here we will call auth code, for now just check for single hard coded PWD
    e.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;
    this.setState({ error: false });

    if (!(username === "guy" && password === "test")) {
      return this.setState({ error: true });
    }

    store.set("loggedIn", true);
    history.push("/dashboard");
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  render() {
    const { error } = this.state;

    if (isLoggedIn()) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div style={{ backgroundColor: "lightgrey" }}>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" error={error} onSubmit={this.onSubmit}>
              <Segment stacked>
                {error && (
                  <Message
                    error={error}
                    content="That username/password is incorrect. Try again!"
                  />
                )}
                <Form.Input
                  inline
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  inline
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
                <Grid columns={2} stackable textAlign="center">
                  <GridRow>
                    <GridColumn>
                      <Form.Button
                        type="submit"
                        color="black"
                        fluid
                        size="large"
                      >
                        Login
                      </Form.Button>
                    </GridColumn>
                    <GridColumn>
                      <Link to="/">
                        <Button color="black" fluid size="large">
                          <Icon name="home" /> Home
                        </Button>
                      </Link>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="https://www.google.com">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
