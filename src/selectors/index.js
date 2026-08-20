import { createSelector } from "reselect";

const getTasks = (state) => state.app.tasks;
const getFilter = (state) => state.app.filter;

export const filteredTasksSelector = createSelector(
  getTasks,
  getFilter,
  (tasks, filter) => {
    const { byId, allIds } = tasks;
    if (filter === 'all') return tasks;
    const filteredIds = allIds.filter((taskId) => {
      const task = byId[taskId];
      if (!task) return false;
      if (filter === 'active') {
        return task.status === 'inProgress';
      }
      if (filter === 'finished') {
        return task.status === 'finished';
      }
      return true;
    });
    return {
      byId,
      allIds: filteredIds,
    };
  }
);