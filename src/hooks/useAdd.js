import {ref} from 'vue'
export const useAdd = (todos) => {
  const input = ref("");
  const addTodo = () => {
    const text = input.value?.trim();
    if (text.length === 0) return;
    todos.value.unshift({
      text,
      completed: false,
    });
    input.value = "";
  };
  return {
    input,
    addTodo,
  };
};