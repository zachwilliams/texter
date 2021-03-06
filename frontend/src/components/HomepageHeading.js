import PropTypes from "prop-types";
import React from "react";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import { openGit } from "../services/Helper";

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="saasJAZ"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="start here to build simple saas products"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button color="github" size="huge" onClick={openGit}>
      <Icon name="github" />
      Check It Out
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

export default HomepageHeading;
