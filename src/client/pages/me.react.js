import React, {PropTypes} from 'react';
import Component from 'react-addons-pure-render-mixin';
import DocumentTitle from '../components/Title';
import mui, {TextField, RaisedButton} from 'material-ui';
import {Grid, Row, Col} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import Loader from '../components/Loader.js';
import {CardTitle, CardText} from 'material-ui/Card';
export default class Me extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    users: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      formStep: {
        email: 1
      }
    };

    // this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.appSetActiveSectionLabel('My Account');

    const {users: {viewer}, actions} = this.props;

    if (!this.props.users.getIn(['forms', 'id', viewer.id, 'password'])) {
      actions.setupUserPasswordForm(viewer.id);
    }
    if (!this.props.users.getIn(['forms', 'id', viewer.id, 'email'])) {
      actions.setupUserEmailForm(viewer.id);
    }
  }

  newEmailChanged(e) {
    this.props.actions.setUserUpdateFormField(e, viewer.id, 'email');
  }
  currentPasswordChanged(e) {
    this.props.actions.setUserUpdateFormField(e, viewer.id, 'email');
  }
  passwordChanged(e) {
    this.props.actions.setUserUpdateFormField(e, viewer.id, 'password');
  }

  renderEmailChangeForm() {
    const viewer = this.props.users.viewer;
    const emailForm = this.props.users.getIn(['forms', 'id', viewer.id, 'email']);

    if (this.state.formStep.email === 1) {
      return (
        <span>
        <TextField
          errorText={emailForm.meta.errors.get('newEmail') || null}
          fullWidth
          name='newEmail'
          onChange={::this.newEmailChanged}
          placeholder='New Email'
          value={emailForm.data.newEmail}
          />
        <br />
        <TextField
          errorText={emailForm.meta.errors.get('currentPassword') || null}
          fullWidth
          name='currentPassword'
          onChange={::this.currentPasswordChanged}
          placeholder='Your current password'
          type='password'
          value={emailForm.data.currentPassword}
          />
        <br />
        <RaisedButton
          disabled={!(emailForm.data.newEmail && emailForm.data.currentPassword)}
          label="Next"
          primary
          type="submit"
          />
        </span>
      );

    } else {
      return (
        <span>
          <p>You will receive a link to confirm your new email.</p>
        <br />
        <RaisedButton
          disabled={!(emailForm.data.newEmail && emailForm.data.currentPassword)}
          label="Send confirmation link"
          primary
          type="submit"
          />
          <span> </span>
        <RaisedButton label="Cancel" onClick={(e)=>{this.resetFormStep(e, 'email');}}/>
      </span>
          );
    }
  }
  render() {

    const {msg, users: {viewer, viewer: {email}}} = this.props;

    const passwordForm = this.props.users.getIn(['forms', 'id', viewer.id, 'password']);
    const emailForm = this.props.users.getIn(['forms', 'id', viewer.id, 'email']);


    /*
    create component that wraps form errors processing, data handling
    it should use formFactory if rom schema is provided
    if not - user can provide whole form rendered
     */

    if (!passwordForm || !emailForm) {
      return <Loader />;
    }
    return (
      <DocumentTitle title={msg.me.title}>

        <Grid fluid style={{marginTop:20}}>
          <Row style={{marginBottom:20}}>
            <Col style={{textAlign:'center'}}>
              <mui.Avatar>
                {viewer.username.charAt(0)}
              </mui.Avatar>
              <br />
              <h1>{viewer.username}</h1>
              <h4>{email}</h4>
            </Col>
          </Row>

          <Row>
            <Col md={4} mdOffset={4} sm={6} smOffset={3}>

              { /*<h3>Security & Email</h3> */ }

              <h4>Change password</h4>
              <form onSubmit={(e)=>{this.handleFormSubmit(e, 'password');}}>
                <TextField
                  errorText={passwordForm.meta.errors.get('password') || null}
                  fullWidth
                  name='password'
                  onChange={::this.passwordChanged}
                  placeholder='New Password'
                  type='password'
                  value={passwordForm.data.password}
                  />
                <br />
                <TextField
                  errorText={passwordForm.meta.errors.get('confirmPassword') || null}
                  name='confirmPassword'
                  onChange={::this.passwordChanged}
                  placeholder='Type new pasword again'
                  type='password'
                  value={passwordForm.data.confirmPassword}
                  />
                <br />
                <TextField
                  errorText={passwordForm.meta.errors.get('currentPassword') || null}
                  name='currentPassword'
                  onChange={::this.passwordChanged}
                  placeholder='Your current password'
                  type='password'
                  value={passwordForm.data.currentPassword}
                  />
                <br />
                <RaisedButton
                  disabled={!(passwordForm.data.password && passwordForm.data.confirmPassword && passwordForm.data.currentPassword)}
                  label="Save"
                  primary
                  type="submit"
                  />
              </form>

              <br />
              <br />

              <h4>Change email</h4>

              <form onSubmit={(e)=>{this.nextFormStep(e, 'email');}}>
                {this.renderEmailChangeForm()}
              </form>

            </Col>

            <Col md={3} mdOffset={1} sm={6} smOffset={3}>
              <Paper zDepth={1}>
                <CardTitle title="Work in progress"/>
                <CardText>
                  <p>Please note that Brainfock is currently under heavy development, and many features are missing in release.</p>
                  <p>Todo list includes linking third-party accouns (Facebook, github, Twitter, LinkedIn etc.), session management, privacy settings and others. </p>
                </CardText>
              </Paper>
            </Col>

          </Row>
        </Grid>


      </DocumentTitle>
    );
  }

  nextFormStep(e, formKey) {
    e.preventDefault();
    let state = this.state;
    state.formStep[formKey]++;
    this.setState(state);
    this.setState({test:Math.random()});
  }

  resetFormStep(e, formKey) {
    e.preventDefault();
    let state = this.state;
    state.formStep[formKey] = 1;
    this.setState(state);
    this.setState({test:Math.random()});
  }


  handleFormSubmit(e, formKey) {
    e.preventDefault();
    const data = this.props.users.getIn(['forms', 'id', this.props.users.viewer.id, formKey]).data;

    this.props.actions.saveUserUpdateForm(this.props.users.viewer.id, formKey, data.toJS());
  }

}
