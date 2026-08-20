import React from "react";
import { resetTask, addTask } from "./actions.js";
import { connect } from "react-redux";
import { faker } from "@faker-js/faker";

const mapStateToProps = (state) => {
  const props = {
    tasks: state.app.tasks,
  };
  return props;
};

class Panel extends React.Component {
  handleReset = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(resetTask());
  };
  handleGenerate = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(resetTask());
    for (let i = 0; i < 5; i++) {
      const paragraph = faker.lorem.words(5);
      dispatch(addTask(paragraph));
    }
  };
  render() {
    return (
      <div className="py-3">
        <button
          type="button"
          data-test="clean"
          className="btn btn-warning btn-sm mr-3"
          onClick={this.handleReset}
        >
          Clean
        </button>
        <button
          type="button"
          data-test="generate"
          className="btn btn-primary btn-sm"
          onClick={this.handleGenerate}
        >
          Generate
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Panel);
