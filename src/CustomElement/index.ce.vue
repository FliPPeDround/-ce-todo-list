<script setup>
import { useAdd } from "../hooks/useAdd"
import { useRemove } from "../hooks/useRemove"
import { useEdit } from "../hooks/useEdit"
import { useFilter } from "../hooks/useFilter"
import { useStorage } from "../hooks/useStorage"
const todos = useStorage()
const { remove, removeCompleted } = useRemove(todos)
const { input, addTodo } = useAdd(todos)
const { editingTodo, editTodo, doneEdit, cancelEdit } = useEdit(remove)
const { allDone, filteredTodos, remainingCount, count } = useFilter(todos)

const vEditingFocus = {
  mounted(el, binding) {
    binding.value && el.focus()
  }
}
</script>

<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        type="text"
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="count">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo"
          :class="{ editing: todo === editingTodo, completed: todo.completed }"
        >
          <div class="view">
            <input type="checkbox" class="toggle" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="remove(todo)"></button>
          </div>
          <input
            v-editing-focus="todo === editingTodo"
            type="text"
            class="edit"
            v-model="todo.text"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="count">
      <span class="todo-count">
        <strong>{{ remainingCount }}</strong> {{ remainingCount > 1 ? "items" : "item" }} left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="count > remainingCount">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style>
@import "../types/index.css";
</style>
