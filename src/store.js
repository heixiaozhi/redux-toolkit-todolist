import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './TodoListSlice'

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})

export default store
