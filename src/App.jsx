import { useState, useMemo, useEffect, useLayoutEffect } from 'react'
import Main from './sections/Main'
import TodosAddForm from './sections/TodosAddForm'
import TodosFilter from './sections/TodosFilter'
import TodosHeading from './sections/TodosHeading'
import TodosList from './sections/TodosList'
import TodosPagination from './sections/TodosPagination'
import { PAGE_NUMBER } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updateTodo, deleteTodo } from './TodoListSlice'

// 根据tab过滤
function filterTodoByTab(todos, tab) {
  switch (tab) {
    case '完成':
      return todos.filter((item) => item.completed)
    case '未完成':
      return todos.filter((item) => !item.completed)
    default:
      return todos
  }
}

function calculatePages(length) {
  if (length === 0) return 1
  // 向上舍入
  return Math.ceil(length / PAGE_NUMBER)
}

function getCurrentPageTodos(todos, currentPage) {
  // 明确
  return todos.slice((currentPage - 1) * PAGE_NUMBER, currentPage * PAGE_NUMBER)
}

function App() {
  // redux
  const todos = useSelector((state) => state.todos.todos)
  const [tab, setTab] = useState('所有')
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()

  // 重复计算结果，使用useMemo
  const filterTodos = useMemo(() => filterTodoByTab(todos, tab), [todos, tab])

  // 总页数，应随过滤数据改变
  const sumPage = useMemo(
    () => calculatePages(filterTodos.length),
    [filterTodos]
  )

  // 根据当前页，计算filtertodos数据
  const visiableTodos = useMemo(
    () => getCurrentPageTodos(filterTodos, currentPage),
    [currentPage, filterTodos]
  )

  // 当数据改变时，检查当前页是否超出总页数
  useLayoutEffect(() => {
    if (currentPage > sumPage) {
      setCurrentPage(sumPage)
    }
  }, [sumPage, currentPage])

  function handleAddTodo(value) {
    dispatch(addTodo(value))
  }

  function handleUpdateTodo(id) {
    dispatch(updateTodo({ id }))
  }

  function handleDeleteTodo(id) {
    dispatch(deleteTodo({ id }))
  }

  function handleChangeTab(value) {
    setTab(value)
  }

  function handleChangePage(value) {
    setCurrentPage((current) => {
      // 因为物理禁止了点击，所以这里省略检查
      return current + value
    })
  }

  return (
    <>
      <Main>
        <TodosHeading />
        <TodosAddForm onAddTodo={handleAddTodo} />
        <TodosFilter tab={tab} onChangeTab={handleChangeTab} />
        <TodosList
          todos={visiableTodos}
          tab={tab}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
        <TodosPagination
          currentPage={currentPage}
          sumPage={sumPage}
          onChangePage={handleChangePage}
        />
      </Main>
    </>
  )
}

export default App
