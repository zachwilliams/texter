import React from "react";
import store from "store";
import { Form, Message, Grid, Header } from "semantic-ui-react";

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
    // TODO here we will call auth code, for now just check for singe hard coded PWD
    e.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;
    this.setState({ error: false });

    if (!(username === "guy" && password === "test")) {
      return this.setState({ error: true });
    }

    store.set("loggedIn", true);
    history.push("/dashboard");
    console.log("WE GOT THE LOGIN CORRECT");
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const loginFormStyle = {
      marginTop: "200px",
    };

    const { error } = this.state;

    return (
      <Grid>
        <title>SAASJAZ | LogIn</title>

        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form style={loginFormStyle} error={error} onSubmit={this.onSubmit}>
            <Header as="h1">Log In</Header>
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
            <Form.Button type="submit">Log In</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
