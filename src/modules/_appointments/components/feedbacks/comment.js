import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { withI18n } from 'react-i18next';

const Styled = {};
Styled.comment = styled(Paper)`
  position: relative;
  padding: 10px 20px;
  margin: 10px 4px;
  font-size: 13px;
  background-color: #f2f2f2;
  color: #555;

  span{
    font-weight: 600;
    font-size: 10px;
    margin-bottom: 8px;
  }
  p{
    font-size: 13px;
    margin-top: 5px;
  }
`;
Styled.selfComment = styled(Styled.comment)`
  animation: show-chat-even 0.15s 1 ease-in;
  background: white!important;
  
  span{
    color: #66bb6a;
  }
  p{
    color: #999;
  }
`;
Styled.reply = styled(Styled.comment)`
  animation: show-chat-even 0.15s 1 ease-in;
  border-left: 2px solid #dedede;
  border-radius: 0!important;
  background: white!important;
  box-shadow: none!important;
  margin: 0;
  span{
    color: #c32b00;
  }
  p{
    color: #999;
  }
`;
Styled.repliesActions = styled.div`
  display: flex;
  justify-content: flex-end;
  span{
    cursor: pointer;
    margin-left: 20px;
    font-size: 12px;
    text-align: right;
    color: #606060;
    font-weight: 600;
  }
`;

class Comment extends Component {
  state = {
    showReplies: false,
  };

  toggleShowReplies = () => {
    this.setState(prevState => ({ showReplies: !prevState.showReplies }));
  };

  render() {
    const { feedback, openReplyMode, readOnly, expandAll, t } = this.props;
    return (
      <Styled.selfComment>
        <span>
          {`${feedback.eid} | ${feedback.timestamp}`}
        </span>
        <p>
          {feedback.message}
        </p>
        { !readOnly && (
          <Styled.repliesActions>
            { feedback.replies.length > 0 && (
            <span onClick={this.toggleShowReplies}>
              {this.state.showReplies ? t('feedbacks.hide_replies') : t('feedbacks.see_replies')}
            </span>
            )}
            <span onClick={() => openReplyMode(feedback)}>
              {t('feedbacks.to_reply')}
            </span>
          </Styled.repliesActions>
        )}
        {(this.state.showReplies || expandAll) && feedback.replies.map((reply, index) => (
          <Styled.reply key={index}>
            <span>
              {`${reply.eid} | ${reply.timestamp}`}
            </span>
            <p>
              {reply.message}
            </p>
          </Styled.reply>
        ))}
      </Styled.selfComment>);
  }
}

export default withI18n()(Comment);
