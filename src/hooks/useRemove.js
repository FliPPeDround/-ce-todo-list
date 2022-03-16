export const useRemove = (todos) => {
  const remove = (todo) => {
    const index = todos.value.indexOf(todo);
    todos.value.splice(index, 1);
  };

  const removeCompleted = () => {
    todos.value = todos.value.filter((todo) => !todo.completed);
  };
  return {
    remove,
    removeCompleted,
  };
};