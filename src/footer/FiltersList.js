import React from 'react';
import PropTypes from 'prop-types';

const FiltersList = ({ AppSetState, AppState }) => (
  <ul className="filters">
    {
      Object.entries(AppState.FILTER_TYPES)
        .map(
          ([name, value]) => (
            <li key={name}>
              <a
                href="#/"
                onClick={() => {
                  AppSetState({ activeFilter: value });
                }}
                className={AppState.activeFilter === value
                  ? 'selected' : ''}
              >
                {name}
              </a>
            </li>
          )

        )
    }
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
