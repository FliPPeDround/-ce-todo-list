import {ref,watchEffect} from 'vue'
import useLocalStorage from "./useLocalStorage.js";

const storage = useLocalStorage();

export const useStorage = () => {
  const KEY = "TODOKEYS";
  const todos = ref(storage.getItem(KEY) || []);
  watchEffect(() => {
    storage.setItem(KEY, todos.value);
  });
  return todos;
};