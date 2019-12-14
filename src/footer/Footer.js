import React from 'react';
import PropTypes from 'prop-types';
import FiltersList from './FiltersList';

class Footer extends React.Component {
  clearCompleted = () => {
    this.props.AppSetState(
      prevState => ({
        todos: prevState.todos
          .filter(
            todo => !todo.checked
          ),
      })
    );
  }

  render() {
    const { AppState } = this.props;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {AppState.todos.filter(todo => !todo.checked).length}
          {' '}
          items left
        </span>

        <FiltersList {...this.props} />

        <button
          onClick={this.clearCompleted}
          type="button"
          className={
            (AppState.todos
              .find(todo => todo.checked)
              ? 'clear-completed' : 'hidden')
          }
        >
          clear-completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  AppState: PropTypes.shape(
    {
      todos: PropTypes.arrayOf(PropTypes.any),
      activeFilter: PropTypes.any,
    }
  ).isRequired,

  AppSetState: PropTypes.func.isRequired,
};

export default Footer;
