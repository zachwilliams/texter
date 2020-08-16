import React, { Component } from "react";
import { Box, Button, Heading, Grommet } from "grommet";
import { Notification } from "grommet-icons";
import TextFeed from './components/TextFeed.js'

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const theme = {
  global: {
    colors: {
      brand: "#02b525",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

class App extends Component {
  render() {
    return (
      <Grommet theme={theme}>
        <Box fill>
          <AppBar>
            <Heading level="3" margin="none">
              Texter
            </Heading>
            <Button icon={<Notification />} onClick={() => {}} />
          </AppBar>
          <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
            <Box
              width="medium"
              background="light-2"
              elevation="small"
              align="center"
              justify="left"
            >
              sidebar<br />
              sidebar<br />
              sidebar<br />
              sidebar<br />


            </Box>
            <Box flex align="center" justify="center">
              <TextFeed />
              <p>sadfjkhasdkjjfh kasdjhf kadsjfh kjsadhfjksdhf</p>
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;
