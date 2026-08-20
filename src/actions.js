export const RESET_TASK = "RESET_TASK";
export const resetTask = () => ({
  type: RESET_TASK,
});

export const ADD_TASK = "ADD_TASK";
export const addTask = (t) => ({
  type: ADD_TASK,
  payload: { t },
});

export const CHANGE_INPUT = "CHANGE_INPUT";
export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  payload: { text },
});

export const DEL_TASK = "DEL_TASK";
export const delTask = (i) => ({
  type: DEL_TASK,
  payload: { i },
});

export const FINISH_TASK = "FINISH_TASK";
export const finishTask = (i) => ({
  type: FINISH_TASK,
  payload: { i },
});

export const CHANGE_STYLE = "CHANGE_STYLE";
export const changeStyle = (i) => ({
  type: CHANGE_STYLE,
  payload: { i },
});

export const FILTER_CHANGE = "FILTER_CHANGE";
export const filterChange = (key) => ({
  type: FILTER_CHANGE,
  payload: { key },
});