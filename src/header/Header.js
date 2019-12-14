import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    currentInputValue: '',
  }

  handleInputChange = (event) => {
    this.setState({ currentInputValue: event.target.value });
  }

  handleInputEnter = (event) => {
    const unicKey = (+new Date());

    if (event.key === 'Enter' && this.state.currentInputValue !== '') {
      this.props.AppSetState(
        prevState => ({
          todos: [...prevState.todos,
            {
              key: unicKey,
              id: unicKey,
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

        <input
          value={this.state.currentInputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputEnter}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

Header.propTypes = {
  AppSetState: PropTypes.func.isRequired,
};

export default Header;
