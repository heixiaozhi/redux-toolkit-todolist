import { useState } from 'react'

const TodosAddForm = ({ onAddTodo }) => {
  const [todo, setTodo] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!todo) return
    // 向上
    onAddTodo({
      value: todo,
      completed: false,
      id: crypto.randomUUID(),
    })
    setTodo('')
  }

  return (
    <form className='todos__add' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='添加你的Todo'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>添加</button>
    </form>
  )
}

export default TodosAddForm
