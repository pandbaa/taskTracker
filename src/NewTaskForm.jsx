import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { addTask, changeInput } from "./actions.js";
import { reduxForm, Field } from "redux-form";

const mapStateToProps = (state) => {
  const props = {
    tasks: state.app.tasks,
  };
  return props;
};

class NewTaskForm extends React.Component {
  handleChange = (e) => {
    const value = e.target.value;
    const { dispatch } = this.props;
    dispatch(changeInput(value));
  };
  handleAdd = (values) => {
    const { dispatch, reset } = this.props;
    const { text } = values;
    if (text && text.trim()) {
      dispatch(addTask(text));
      reset();
    }
  };
  render() {
    return (
      <form
        action=""
        className="form-inline"
        onSubmit={this.props.handleSubmit(this.handleAdd)}
      >
        <div className="form-group mx-sm-3">
          <Field name="text" required component="input" type="text" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Add
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: "newTask",
  })(NewTaskForm),
);
