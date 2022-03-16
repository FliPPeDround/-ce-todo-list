import { ref, computed, onMounted, onUnmounted } from "vue";
export const useFilter = (todos) => {
  const allDone = computed({
    get: () => {
      return !todos.value.filter((item) => !item.completed).length;
    },
    set: (value) => {
      todos.value.forEach((todo) => {
        todo.completed = value;
      });
    },
  });

  const filter = {
    all: (list) => list,
    active: (list) => list.filter((todo) => !todo.completed),
    completed: (list) => list.filter((todo) => todo.completed),
  };

  const type = ref("all");
  const filteredTodos = computed(() => filter[type.value](todos.value));

  const remainingCount = computed(() => filter.active(todos.value).length);

  const count = computed(() => todos.value.length);

  const onHashChange = () => {
    const hash = window.location.hash.replace("#/", "");
    if (filter[hash]) {
      type.value = hash;
    } else {
      type.value = "all";
      window.location.hash = "";
    }
  };

  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
  });

  onUnmounted(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  return {
    allDone,
    filteredTodos,
    remainingCount,
    count,
  };
};