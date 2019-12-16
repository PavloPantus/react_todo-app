import React from 'react';
import PropTypes from 'prop-types';
import TodosList from './TodosList';

class Main extends React.Component {
  toogleAll = () => {
    this.props.AppSetState((prevState) => {
      const checkeorNot = prevState.todos
        .some(onetodo => !onetodo.checked);

      return {
        todos: prevState.todos.map(
          (todo) => {
            if (checkeorNot) {
              return {
                ...todo,
                checked: true,
              };
            }

            return {
              ...todo,
              checked: !todo.checked,
            };
          }
        ),

      };
    });
  }

  render() {
    const { AppState } = this.props;

    return (
      <section className="main" style={{ display: 'block' }}>
        <input
          checked={
            AppState.todos.length > 0
              ? AppState.todos.every(todo => todo.checked)
              : false
          }

          onChange={this.toogleAll}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodosList
          AppSetState={this.props.AppSetState}
          activeFilter={AppState.activeFilter}
          todos={AppState.todos}
          AppState={AppState}
        />
      </section>
    );
  }
}

Main.propTypes = {
  AppState: PropTypes.shape(
    {
      todos: PropTypes.arrayOf(PropTypes.any),
      activeFilter: PropTypes.any,
    }
  ).isRequired,

  AppSetState: PropTypes.func.isRequired,
};

export default Main;
