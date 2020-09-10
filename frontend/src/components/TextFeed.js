//
// NOT CURRENTLY USED, trying to learn react and such
//

import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'

 
class TextFeed extends Component {

  constructor(props) {
    super(props);
 
  // temoprary for demo
    this.state = {
      messages: [
        new Message({
          id: 1,
          message: "I'm the recipient! (The person you're talking to)",
        }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" })
      ],
      is_typing: true,
    };
  }
 
  render() {
    return (
      <ChatFeed
        messages={this.state.messages} // Boolean: list of message objects
        isTyping={this.state.is_typing} // Boolean: is the recipient typing
        hasInputField={false} // Boolean: use our input, or use your own
        showSenderName={true} // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={
          {
            text: {
              fontSize: 18
            },
            chatbubble: {
              borderRadius: 70,
              padding: 40
            }
          }
        }
    />
    )
  }
}
 
export default TextFeed;
