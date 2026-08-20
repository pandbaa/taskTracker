import React from "react";
import "./App.css";
import Panel from "./Panel.jsx";
import Tasks from "./Tasks.jsx";
import Filter from "./Filter.jsx";
import NewTaskForm from "./NewTaskForm.jsx";

class App extends React.Component {
  render() {
    return (
      <div className="col-5">
        <Panel />
        <NewTaskForm />
        <Filter />
        <Tasks />
      </div>
    );
  }
}

export default App;
