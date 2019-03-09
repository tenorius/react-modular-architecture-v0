import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';
import { duckOperations as appointmentsOperations } from '../../ducks/index';
import AdminFeedbacksTab from './adminFeedbacksTab';
import Comment from './comment';
import myToast from '../../../common/utils/toast';

const Styled = {};

Styled.header = styled.div`
  height: 60px;
  margin-bottom: ${props => (props.replyMode ? '0' : '48px')};
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
  color: #666;
  font-size: 13px;
  text-align: left;
  padding: 0 16px;
  border: 1px solid wheat;
  margin-bottom: 16px;
`;
Styled.chat = styled.div`

`;
Styled.history = styled.div`
  text-align: center;
  font-size: 15px;
  margin-bottom: 16px;
  color: #66bb6a;

.svg {
  margin-right: 10px;
  color: #ccc;
}
`;
Styled.commentsContainer = styled.div`
  overflow-y: scroll;
  max-height: 360px;
  min-height: 360px;
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

const viewStatus = {
  OPEN: 'open',
  CLOSED: 'closed',
};

class adminFeedbackModal extends Component {
  state = {
    replyMode: false,
    replyTo: null,
    selectedView: viewStatus.OPEN,
    form: {
      reply: {
        label: 'Reply',
        name: 'reply',
        value: '',
        validations: {
          sah: true,
        },
        error: false,
      },
    },
  };

  componentDidMount() {
    this.props.actions.fetchAdminFeedbacks();
  }

  handleReplyInput = (event) => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        reply: {
          ...state.form.reply,
          value,
        },
      },
    }));
  };

  updateFeedback = () => {
    const { t } = this.props;
    this.props.actions.fetchUpdateFeedback(this.state.replyTo.id, this.state.form.reply.value)
      .on('done', () => {
        this.closeReplyMode();
        myToast.success(t('feedbacks.reply_sent'));
      });
  };

  handleViewSelection = (event, view) => {
    if (this.state.selectedView === view) return;
    this.setState({ selectedView: view });
  };

  enterReplyMode = (feedback) => {
    this.setState({ replyMode: true, replyTo: feedback });
  };

  closeReplyMode = () => {
    this.setState({ replyMode: false, replyTo: null });
  };


  render() {
    const { onClose, feedbacks, t } = this.props;
    return (
      <Wrapper className="__FeedbackModal">
        <Styled.header replyMode={this.state.replyMode}>
          <Grid className="title" container direction="row" justify="center" alignItems="center">
            <span>{t('feedbacks.title_admin')}</span>
          </Grid>
        </Styled.header>
        { this.state.replyMode
          ? (
            <Fragment>
              <Styled.body>
                <Styled.commentsContainer>
                  <Comment feedback={this.state.replyTo} readOnly />
                  <TextField
                    fullWidth
                    multiline
                    rowsMax={5}
                    rows={5}
                    label={t(`feedbacks.${this.state.form.reply.name}`)}
                    type="text"
                    name={this.state.form.reply.name}
                    value={this.state.form.reply.value}
                    onChange={this.handleReplyInput}
                    autoFocus
                  />
                </Styled.commentsContainer>
              </Styled.body>
            </Fragment>
          )
          : (
            <Fragment>
              <AdminFeedbacksTab
                changeHandler={this.handleViewSelection}
                selectedView={this.state.selectedView}
                labels={[viewStatus.OPEN, viewStatus.CLOSED]}
                t={t}
              />
              <Styled.body>
                <Styled.commentsContainer>
                  {feedbacks.list.map(id => (feedbacks.byIds[id]))
                    .filter(feedback => (this.state.selectedView === viewStatus.CLOSED ? feedback.replies.length > 0 : feedback.replies.length === 0))
                    .map(filteredFeedback => (
                      <Comment key={filteredFeedback.id} feedback={filteredFeedback} openReplyMode={this.enterReplyMode} />
                    ))}
                </Styled.commentsContainer>
                <div className="comment-box" />
              </Styled.body>
            </Fragment>
          )}


        <Divider />
        { !this.state.replyMode ? (
          <Styled.footer container direction="row" alignItems="center" justify="flex-end" className="footer">
            <MyButton variant="contained" color="secondary" onClick={onClose}>
              {t('cancel')}
            </MyButton>
          </Styled.footer>
        ) : (
          <Styled.footer container direction="row" alignItems="center" justify="flex-end" className="footer">
            <MyButton variant="contained" color="secondary" onClick={this.closeReplyMode}>
              {t('cancel')}
            </MyButton>
            <MyButton variant="contained" color="secondary" onClick={this.updateFeedback}>
              {t('send')}
            </MyButton>
          </Styled.footer>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  feedbacks: state.adminFeedbacks,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appointmentsOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(adminFeedbackModal);
