import { omit } from "lodash";
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const defaultState = {
    tasks: {
      byId: {},
      allIds: [],
    },
  inputValue: "",
  tasksUIState: {},
  filter: "all",
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const { t } = action.payload;
      const id = state.tasks.allIds.length;
      const taskId = `task${id}`;
      return {
        ...state,
        tasks: {
          byId: {
            ...state.tasks.byId,
            [taskId]: {
              id: taskId,
              body: t,
              status: "inProgress",
            },
          },
          allIds: [...state.tasks.allIds, taskId],
        },
        inputValue: "",
        tasksUIState: {
          ...state.tasksUIState,
          [taskId]: {
            style: "light",
          },
        },
      };
    }
    case "RESET_TASK": {
      return {
        ...state,
        tasks: {
          byId: {},
          allIds: [],
        },
        inputValue: "",
        tasksUIState: {},
      };
    }
    case "CHANGE_INPUT": {
      const { text } = action.payload;
      return {
        ...state,
        inputValue: text,
      };
    }
    case "DEL_TASK": {
      const { i } = action.payload;
      return {
        ...state,
        tasks: {
          byId: omit(state.tasks.byId, i),
          allIds: state.tasks.allIds.filter((id) => id !== i),
        },
        tasksUIState: omit(state.tasksUIState, i),
      };
    }
    case "FINISH_TASK": {
      const { i } = action.payload;
      return {
        ...state,
        tasks: {
          byId: {
            ...state.tasks.byId,
            [i]: {
              ...state.tasks.byId[i],
              status: "finished",
            },
          },
          allIds: state.tasks.allIds,
        },
      };
    }
    case "CHANGE_STYLE": {
      const { i } = action.payload;
      const nowStyle = state.tasksUIState[i].style;
      const nextStyle = nowStyle === "light" ? "dark" : "light";
      console.log(i, nowStyle, nextStyle);
      return {
        ...state,
        tasksUIState: {
          ...state.tasksUIState,
          [i]: {
            style: nextStyle,
          },
        },
      };
    }
    case "FILTER_CHANGE": {
      const { key } = action.payload;
      return {
        ...state,
        filter: key,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: reducer,
  form: formReducer,
});

export default rootReducer;
