import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

class TodosList extends React.Component {
  state = {
    currentEditingItemId: '',

  }

  componentDidUpdate() {
    if (document.querySelector('.edit')) {
      document.querySelector('.edit').focus();
    }
  }

  handleToogleCklick = (Id) => {
    /* event.persist()* якшо це сюди вставити то воно
    спрацює без замикання, з +event.target.id */
    this.props.AppSetState(
      prevState => ({
        todos: [...prevState.todos
          .map((todo) => {
            if (todo.id === Id) {
              return {
                ...todo, checked: !todo.checked,
              };
            }

            return todo;
          }),
        ],
      })
    );
  }

  handleDestroyCklick = (Id) => {
    /* event.persist()* якшо це сюди вставити то воно спрацює
    без замикання, з +event.target.id */
    this.props.AppSetState(
      prevState => ({
        todos: [...prevState.todos
          .filter((todo) => {
            if (todo.id === Id) {
              return false;
            }

            return true;
          }),
        ],
      })
    );
  }

  filters = filter => ({
    activeFilterAll: () => true,

    activeFilterActive: todo => todo.checked === false,

    activeFilterCompleted: todo => todo.checked === true,
  }[filter]);

  handleChangeEditingInput = (event) => {
    this.setState(
      {
        currentEditingvalue: event.target.value,
      }
    );
  }

  OnBlurEditingInput = () => {
    this.props.AppSetState(
      prevState => ({
        todos: prevState.todos
          .map(
            (todo) => {
              if (todo.id === this.state.currentEditingItemId) {
                return {
                  ...todo,
                  content: this.state.currentEditingvalue || todo.content,
                };
              }

              return todo;
            }
          ),
      })
    );

    this.setState({
      currentEditingItemId: '',
    });
  }

  EnterOnEditingInput = (event) => {
    if (event.key === 'Enter') {
      document.querySelector('.edit').blur();
    }
  }

  render() {
    const { todos, activeFilter, AppState } = this.props;
    const { handleToogleCklick, handleDestroyCklick } = this;

    return (
      <ul className="todo-list">
        {
          todos
            .filter(todo => (activeFilter !== ''
              ? this.filters(activeFilter)(todo) : true))
            .map(todo => (
              <li
                className={
                  classNames(
                    {
                      editing: this.state.currentEditingItemId === todo.id,
                      completed: todo.checked === true,
                    }

                  )
                }
                key={todo.key}
              >
                <div className={todo.class}>
                  <input
                    onChange={() => {
                      handleToogleCklick(todo.id);
                    }}
                    checked={todo.checked}
                    type="checkbox"
                    className="toggle"
                    id={todo.id}
                  />

                  {
                    this.state.currentEditingItemId === todo.id
                      ? (
                        <input
                          className="edit"
                          value={this.state.currentEditingvalue
                          || AppState.todos
                            .find(todoSearched => todoSearched.id === todo.id)
                            .content
                          }
                          onChange={this.handleChangeEditingInput}
                          onBlur={this.OnBlurEditingInput}
                          onKeyPress={this.EnterOnEditingInput}
                        />
                      )
                      : (
                        <p
                          onDoubleClick={() => {
                            this.setState(
                              {
                                currentEditingItemId: todo.id,
                              }
                            );
                          }}
                          data-id={todo.id}
                        >
                          {todo.content}
                        </p>
                      )
                  }

                  <button
                    type="button"
                    data-id={todo.id}
                    onClick={() => handleDestroyCklick(todo.id)}
                    className="destroy"
                  />
                </div>
              </li>
            ))
        }
      </ul>
    );
  }
}

TodosList.propTypes = {

  activeFilter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.any).isRequired,
  AppState: PropTypes.shape({
    todos: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  AppSetState: PropTypes.func.isRequired,
};

export default TodosList;
