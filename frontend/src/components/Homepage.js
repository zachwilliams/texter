import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from "semantic-ui-react";

import HomePageContainer from "./HomePageContainer";
import { openGit } from "../services/Helper";

const Homepage = () => (
  <HomePageContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We help companies company and businesses business.
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Do you want to build an app, make some saas, and do start up? Us
              too! So we created this template to help us.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              But what is it again?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              saasJaz is a fairly simple open source template we intend to use
              to create simple saas applications for people. A react frontend,
              golang serverside code, a little bit of postgres, and deployed on
              aws fargate.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image bordered rounded size="large" src="/white-image.png" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button as="a" size="large" color="github" onClick={openGit}>
              <Icon name="github" />
              Clone It Out
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "What a great thing!"
            </Header>
            <p style={{ fontSize: "1.33em" }}>- Everyone</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "I would probably use this"
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <Image avatar src="/zach-avatar.jpeg" />
              <b>Zach</b> guy who said this
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          But Why?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Focus on content creation and the hard work, copy this code to start
          your app off strong. It's all work i had to do anyway, might as well
          try to make it a bit reusable.
        </p>
        <Button as="a" size="large" color="github" onClick={openGit}>
          <Icon name="github" />
          Fork and Learn
        </Button>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a href="https://www.github.com">GitHub</a>
        </Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Did We Tell You About Other things?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Well there aren't any other things but you're welcome to take this
          code and clone it and add some other things.
        </p>
        <Button as="a" size="large" color="github" onClick={openGit}>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About Company" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Services</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for even more action calls inside the footer that
                could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </HomePageContainer>
);

export default Homepage;
