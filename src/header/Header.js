import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    currentInputValue: '',
  }

  handleInputChange = (event) => {
    this.setState({ currentInputValue: event.target.value });
  }

  SaveCurrentInput = () => {
    const uniqueKey = (+new Date());

    if (this.state.currentInputValue !== '') {
      this.props.AppSetState(
        prevState => ({
          todos: [...prevState.todos,
            {
              key: uniqueKey,
              id: uniqueKey,
              content: this.state.currentInputValue,
              checked: false,

            },
          ],
        })
      );
      this.setState({ currentInputValue: '' });
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={this.SaveCurrentInput}
          id="new-todo-form"
          action=""
          method=""
          name="current-input"
        >
          <input
            value={this.state.currentInputValue}
            onChange={this.handleInputChange}
            onBlur={() => {
              document.querySelector('#new-todo-form').submit();
              this.SaveCurrentInput();
            }}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  AppSetState: PropTypes.func.isRequired,
};

export default Header;
