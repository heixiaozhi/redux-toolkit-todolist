const TodosItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  return (
    <li className='todos__list-item'>
      <label>
        <input
          type='checkbox'
          className='checkbox'
          checked={todo.completed}
          onChange={() => onUpdateTodo(todo.id)}
        />
        <span className='checkbox-icon'></span>
      </label>
      <span className={`${todo.completed ? 'checked' : ''} ellipsis`}>
        {todo.value}
      </span>
      <button onClick={() => onDeleteTodo(todo.id)}>删除</button>
    </li>
  )
}

export default TodosItem
