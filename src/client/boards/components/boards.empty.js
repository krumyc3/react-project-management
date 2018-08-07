/**
 * Brainfock, <http://www.brainfock.org>
 *
 * Copyright (C) 2015-present Sergii Gamaiunov <hello@webkadabra.com>
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Component from 'react-addons-pure-render-mixin';
import React, {PropTypes} from 'react';
import {RaisedButton, Paper} from 'material-ui';

export default class ProjectsEmpty extends React.Component {

  static propTypes = {
    boards: PropTypes.object.isRequired,
    form: PropTypes.object,
    params: PropTypes.object.isRequired,
    topicActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }

  /**
   * @todo l10n
   * @returns {XML}
   */
  render() {
    const formContent = React.cloneElement(this.props.form, {ref: 'formView'});

    let formStyles = {
        padding: 20
      },
      controlStyles = {};

    if (!this.state.showForm) {
      formStyles.display = 'none';
    }
    if (this.state.showForm) {
      controlStyles.display = 'none';
    }

    return (
      <div>
        <div className="clearfix" style={{
          background: 'rgb(42, 66, 183)',
          color: '#fff',
          padding: '0 0 25px'
        }}>
          <div className="col-md-6 col-md-offset-3 ">

            <h2>Welcome to discussion boards!</h2>
            <div style={controlStyles}>
              <p>Engage your clients and customers in discussions, build and grow your community, improve communications!</p>
              <RaisedButton
                label="Create your first board"
                onClick={e => this.setState({
                  target: e.target,
                  showForm: !this.state.showForm
                })}
                primary
                />
            </div>

            <Paper style={formStyles}>

              {formContent}

              <RaisedButton
                label="Save"
                onClick={this.onFormSubmit.bind(this)}
                primary
                style={{marginRight:15}}
                />

              <a
                children="Do it later"
                href="#"
                onClick={e => this.setState({
                  target: e.target,
                  showForm: !this.state.showForm
                })}
                />
            </Paper>
          </div>
        </div>
      </div>
    );
  }

  onFormSubmit(e) {
    this.refs.formView.onFormSubmit(e);
  }
}
