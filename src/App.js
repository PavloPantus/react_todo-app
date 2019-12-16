import React from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

class App extends React.Component {
  state = {
    todos: (() => {
      if (localStorage.todos !== undefined) {
        return [...JSON.parse(localStorage.todos)];
      }

      return [];
    })(),
    activeFilter: 'activeFilterAll',

    FILTER_TYPES: {
      All: 'activeFilterAll',
      Active: 'activeFilterActive',
      Completed: 'activeFilterCompleted',
    },
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  AppSetState = (addItToAppState) => {
    this.setState(addItToAppState);
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          AppSetState={this.AppSetState}
          AppState={this.state}
        />

        <Main
          AppSetState={this.AppSetState}
          AppState={this.state}
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
        />

        <Footer
          AppSetState={this.AppSetState}
          AppState={this.state}
          FILTER_TYPES={this.state.FILTER_TYPES}
        />
      </section>
    );
  }
}

export default App;
