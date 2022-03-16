import {ref} from 'vue'
export const useEdit = (remove) => {
  let beforeEditingText = "";
  const editingTodo = ref(null);

  // 双击编辑
  const editTodo = (todo) => {
    beforeEditingText = todo.text;
    editingTodo.value = todo;
  };

  // blur或enter时
  const doneEdit = (todo) => {
    if (!editingTodo.value) return;
    todo.text = todo.text.trim();
    if (todo.text === "") remove(todo);
    editingTodo.value = null;
  };

  // esc取消
  const cancelEdit = (todo) => {
    editingTodo.value = null;
    todo.text = beforeEditingText;
  };
  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit,
  };
};