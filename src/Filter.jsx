import React from "react";
import { connect } from "react-redux";
import { filterChange } from "./actions.js";

const mapStateToProps = (state) => {
  const props = {
    filter: state.filter,
  };
  return props;
};

class Filter extends React.Component {
  handleFilterChange = (key) => {
    const { dispatch } = this.props;
    dispatch(filterChange(key));
  };
  render() {
    const buttonLabels = [
      { key: "all", label: "All Tasks" },
      { key: "active", label: "Active Tasks" },
      { key: "finished", label: "Finished Tasks" },
    ];
    const { filter } = this.props;
    return (
      <div className="mt-3 d-flex justify-content-around">
        {buttonLabels.map(({ key, label }) => {
          const isActive = key === filter;
          return isActive ? (
            <span key={key} className="fw-bold text-primary">
              {label}
            </span>
          ) : (
            <button
              key={key}
              type="button"
              className="btn btn-link border-0 p-0 text-decoration-none"
              onClick={() => this.handleFilterChange(key)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Filter);
