import TodosItem from '../components/TodosItem'

const TodosList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  return (
    <ul className='todos__list'>
      {todos.map((todo) => {
        return (
          <TodosItem
            todo={todo}
            key={todo.id}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        )
      })}
    </ul>
  )
}

export default TodosList
