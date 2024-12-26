import { TABS } from '../utils/constants'

const TodosFilter = ({ tab, onChangeTab }) => {
  function handleChange(value) {
    onChangeTab(value)
  }

  return (
    <div className='todos__filter'>
      {TABS.map((item) => {
        return (
          <button
            key={item}
            className={`todos__filter-btn ${
              tab === item ? 'todos__filter-btn--active' : ''
            }`}
            onClick={() => handleChange(item)}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default TodosFilter
