import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import HistoryIcon from '@material-ui/icons/History';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';
import { duckOperations as appointmentsOperations } from '../../ducks/index';
import Comment from './comment';

const Styled = {};

Styled.header = styled.div`
  height: 60px;
  background: #66BB6A;
  border-top: 4px solid darkgreen;
  .title{
    height: 100%;
    color: white;
    font-size: 16px;
  }
  svg{
    margin-right: 10px;
    fill: white;
  }
`;
Styled.body = styled.div`
  padding: 0 16px;
`;
Styled.info = styled.div`
  background: floralwhite;
  border-radius: 0px;
  color: #999;
  font-size: 13px;
  text-align: left;
  padding: 0 16px;
  border: 1px solid wheat;
  margin-bottom: 16px;
`;
Styled.chat = styled.div`

`;
Styled.history = styled.div`
  display: flex;
  font-size: 12px;
  margin: 4px;
  color: #66bb6a;
  justify-content: center;
  align-items: center;

 svg {
  margin-right: 10px;
  fill: #ccc;
  }
`;
Styled.commentsContainer = styled.div`
  overflow-y: scroll;
  max-height: 360px;
`;
Styled.comment = styled(Paper)`
  position: relative;
  padding: 10px 20px;
  margin: 10px 4px;
  font-size: 13px;
  background-color: #f2f2f2;
  color: #555;

  span{
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 8px;
  }
  p{
    font-size: 13px;
    margin-top: 5px;
  }
`;
Styled.selfComment = styled(Styled.comment)`
  animation: show-chat-even 0.15s 1 ease-in;
  background: aliceblue!important;

  span{
    color: #66bb6a;
  }
  p{
    color: #999;
  }
`;
Styled.reply = styled(Styled.comment)`
  animation: show-chat-even 0.15s 1 ease-in;
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
Styled.footer = styled(Grid)`
  padding: 16px;
  height: 60px;
`;


const Wrapper = styled(Paper)`
  position: absolute!important;
  top: 50%!important;
  left: 50%!important;
  width: 90%!important;
  max-width: 600px;
  background-color: #fff!important;
  transform: translate(-50%, -50%)!important;
`;
const MyButton = styled(Button)`
  height: 36px;
  margin-left: 16px!important;
`;

class UserFeedbackModal extends Component {
  state = {
    commentMode: false,
    form: {
      feedback: {
        label: 'Feedback',
        name: 'feedback',
        value: '',
        validations: {
          sah: true,
        },
        error: false,
      },
    },
  };

  componentDidMount() {
    this.props.actions.fetchUserFeedbacks();
  }

  handleFeedbackInput = (event) => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        feedback: {
          ...state.form.feedback,
          value,
        },
      },
    }));
  };

  saveFeedback = () => {
    this.props.actions.fetchCreateFeedBack(this.state.form.feedback.value).on('done', this.props.onClose);
  };

  enterCommentMode = () => {
    this.setState({ commentMode: true });
  };

  exitCommentMode = () => {
    this.setState({ commentMode: false });
  };

  render() {
    const { onClose, feedbacks, t } = this.props;
    return (
      <Wrapper className="__FeedbackModal">
        <Styled.header>
          <Grid className="title" container direction="row" justify="center" alignItems="center">
            <span>{t('feedbacks.title_user')}</span>
          </Grid>
        </Styled.header>
        { !this.state.commentMode ? (
          <Styled.body>
            <Styled.history>
              <HistoryIcon />
              <span>{t('feedbacks.message_history')}</span>
            </Styled.history>
            <Styled.commentsContainer>
              <Styled.info>
                <p>
                  {t('feedbacks.info', { user: 'User' })}
                </p>
              </Styled.info>
              { feedbacks.list.map((id) => {
                const feedback = feedbacks.byIds[id];
                return (
                  <Comment feedback={feedback} expandAll readOnly />
                );
              })}
            </Styled.commentsContainer>
          </Styled.body>
        ) : (
          <Styled.body>
            <Styled.commentsContainer>
              <Styled.info>
                <p>
                  {t('feedbacks.info', { user: 'User' })}
                </p>
              </Styled.info>
              <TextField
                fullWidth
                multiline
                rowsMax={5}
                rows={5}
                label="Feedback"
                type="text"
                value={this.state.form.feedback.value}
                onChange={this.handleFeedbackInput}
                autoFocus
              />
            </Styled.commentsContainer>
          </Styled.body>
        )}

        <Divider />
        { !this.state.commentMode ? (
          <Styled.footer container direction="row" alignItems="center" justify="flex-end" className="footer">
            <MyButton variant="contained" color="secondary" onClick={onClose}>
              {t('cancel')}
            </MyButton>
            <MyButton variant="contained" color="secondary" onClick={this.enterCommentMode}>
              {t('new')}
            </MyButton>
          </Styled.footer>
        ) : (
          <Styled.footer container direction="row" alignItems="center" justify="flex-end" className="footer">
            <MyButton variant="contained" color="secondary" onClick={this.exitCommentMode}>
              {t('cancel')}
            </MyButton>
            <MyButton variant="contained" color="secondary" onClick={this.saveFeedback}>
              {t('send')}
            </MyButton>
          </Styled.footer>
        )}
      </Wrapper>
    );
  }
}


const mapStateToProps = state => ({
  feedbacks: state.userFeedbacks,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appointmentsOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(UserFeedbackModal);
