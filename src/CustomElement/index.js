import { defineCustomElement } from 'vue'
import VueTodoList from './index.ce.vue'

// Vue generates a new HTML element class from the component definition.
export const TodoList = defineCustomElement(VueTodoList)

// Register the custom element so that it can be used as <dark-mode-switch>.
export function register (tagName = 'todo-list') {
  customElements.define(tagName, TodoList)
}