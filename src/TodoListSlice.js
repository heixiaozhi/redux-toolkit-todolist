import { createSlice } from '@reduxjs/toolkit'

// 从 localStorage 中加载 todos
const loadState = () => {
  const todos = localStorage.getItem('todos')
  if (todos === null) {
    return { todos: [] }
  }
  return JSON.parse(todos)
}

const initialState = loadState()

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
      saveState(state)
    },
    updateTodo: (state, action) => {
      const { id } = action.payload
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
      // todo 是一个对象，所以修改find返回的对象，会直接修改state中的对象
      // console.log(state.todos.find((todo) => todo.id === id))
      saveState(state)
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload
      state.todos = state.todos.filter((todo) => todo.id !== id)
      saveState(state)
    },
  },
})

const saveState = (state) => {
  const serializedState = JSON.stringify(state)
  localStorage.setItem('todos', serializedState)
}

export const { addTodo, updateTodo, deleteTodo } = todoListSlice.actions

export default todoListSlice.reducer
