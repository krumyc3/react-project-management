import Buttons from '../todos/buttons.react';
import Component from 'react-addons-pure-render-mixin';
import DocumentTitle from '../components/Title';
import NewTodo from '../todos/newTodo.react';
import React, {PropTypes} from 'react';
import TodosList from '../todos/todosList.react';

export default class Todos extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    todos: PropTypes.object
  }

  render() {
    const {actions, msg: {todos: msg}, todos: {newTodo, list}} = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="todos-page">
          <NewTodo {...{actions, msg, newTodo}} />
          <TodosList {...{actions, list, msg}} />
          <Buttons clearAllEnabled={list.size > 0} {...{actions, msg}} />
        </div>
      </DocumentTitle>
    );
  }

}
