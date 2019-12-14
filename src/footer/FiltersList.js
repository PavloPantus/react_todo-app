import React from 'react';
import PropTypes from 'prop-types';

const FiltersList = ({ AppSetState, AppState }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        onClick={() => {
          AppSetState({ activeFilter: 'activeFilterAll' });
        }}
        className={AppState.activeFilter === 'activeFilterAll'
          ? ('selected') : ''}
      >
            All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        onClick={() => {
          AppSetState({ activeFilter: 'activeFilterActive' });
        }}
        className={AppState.activeFilter === 'activeFilterActive'
          ? ('selected') : ''}
      >
            Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        onClick={() => {
          AppSetState({ activeFilter: 'activeFilterCompleted' });
        }}
        className={AppState.activeFilter === 'activeFilterCompleted'
          ? ('selected') : ''}
      >
            Completed
      </a>
    </li>
  </ul>
);

FiltersList.propTypes = {
  AppState: PropTypes.shape(
    {
      todos: PropTypes.arrayOf(PropTypes.any),
      activeFilter: PropTypes.any,
    }
  ).isRequired,

  AppSetState: PropTypes.func.isRequired,
};

export default FiltersList;
