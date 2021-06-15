import React, { Component } from 'react';
import { connect } from 'react-redux';
import Conversation from 'UBHR/components/Conversation';
import { selectConversation } from 'UBHR/actions/chatActions';
class Mesages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedConversation: null,
        };
    }

    render() {
        const { chatUsersOnlineMap, conversations, selectedConversation } = this.props;
        console.log('chatUsersOnlineMap', chatUsersOnlineMap);
        return (
            <div className="messagesContainer">
                <div className="messagesLeft">
                    {conversations
                        ? conversations.map((conversation) => {
                              return (
                                  <div
                                      key={`connection_${conversation.with.id}`}
                                      className={`chat-user-container${
                                          selectedConversation !== null &&
                                          conversation.with.id === selectedConversation.with.id
                                              ? ' chat-user-container--selected'
                                              : ''
                                      }`}
                                      onClick={() => this.props.selectConversation(conversation)}
                                  >
                                      {conversation.with.name}
                                      {chatUsersOnlineMap.includes(conversation.with.id) ? (
                                          <div className="onlineDot"></div>
                                      ) : (
                                          ''
                                      )}
                                  </div>
                              );
                          })
                        : null}
                </div>
                <div className="messagesRight">
                    <Conversation conversation={this.state.selectedConversation} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggingIn: state.auth.loggingIn,
        isLoggedIn: state.auth.isLoggedIn,
        conversations: state.chat.conversations,
        chatUsers: state.chat.chatUsers,
        chatUsersOnlineMap: state.chat.chatUsersOnlineMap,
        selectedConversation: state.chat.selectedConversation,
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        selectConversation: (conversation) => {
            dispatch(selectConversation({ conversation }));
        },
    };
};
export default connect(mapStateToProps, mapDispatchProps)(Mesages);
