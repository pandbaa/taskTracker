import React from "react";
import { connect } from "react-redux";
import { delTask, finishTask, changeStyle } from "./actions.js";
import cn from "classnames";
import { filteredTasksSelector } from "./selectors/index.js";

const mapStateToProps = (state) => {
  const props = {
    tasks: filteredTasksSelector(state),
    tasksUIState: state.app.tasksUIState,
    filter: state.app.filter,
  };
  return props;
};

class Tasks extends React.Component {
  handleChangeStyle = (e) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    const { dispatch } = this.props;
    dispatch(changeStyle(id));
  };
  handleTaskFinish = (e) => {
    const id = e.currentTarget.id;
    const { dispatch } = this.props;
    dispatch(finishTask(id));
  };
  handleDelTask = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { dispatch } = this.props;
    dispatch(delTask(id));
  };
  render() {
    const { tasks, tasksUIState } = this.props;
    const { byId, allIds } = tasks;
    return (
      <ul className="list-group-item d-flex">
        {allIds.map((task) => {
          const uiStyle = tasksUIState?.[task]?.style || "light";
          const itemClasses = cn("list-group-item", {
            "bg-light": uiStyle === "light",
            "bg-dark": uiStyle === "dark",
            "text-white": uiStyle === "dark",
          });
          return (
            <li key={task} className={itemClasses}>
              <span
                className="task-body"
                id={task}
                onClick={this.handleChangeStyle}
              >
                {byId[task].body}
              </span>
              <span id={task} onClick={this.handleTaskFinish}>
                {byId[task].status}
              </span>
              <button
                type="button"
                className="close"
                onClick={this.handleDelTask(task)}
              >
                <span>&times;</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connect(mapStateToProps)(Tasks);
